import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    ArrowUpRight,
    CheckCircle2,
    Loader2,
    MapPin,
    TriangleAlert,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { contactLinks, siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { postApi } from "@/lib/api";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/* -------------------------------------------------------------------------- */
/* Schema                                                                      */
/* -------------------------------------------------------------------------- */

const INTERESTS = [
    "Art",
    "Painting",
    "Craft",
    "Dance",
    "Zumba",
    "Wedding / Event Choreography",
];

const AGE_GROUPS = [
    "Under 8",
    "8 – 12",
    "13 – 17",
    "18 – 30",
    "31 – 50",
    "Above 50",
];

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Please enter your name.")
        .max(80, "That name is a little long — please shorten it."),
    phone: z
        .string()
        .trim()
        .regex(
            /^(\+?91[-\s]?)?[6-9]\d{9}$/,
            "Enter a valid 10-digit Indian mobile number.",
        ),
    interest: z.string().min(1, "Please choose what you're interested in."),
    ageGroup: z.string().optional(),
    message: z
        .string()
        .trim()
        .max(600, "Please keep the message under 600 characters.")
        .optional(),
    // Honeypot — hidden from humans, tempting for bots. Any value here is
    // dropped silently in `onSubmit`; nothing to reveal, no validation error.
    company: z.string().optional(),
});

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * EnquiryForm (H) — "Your Creative Journey Starts Here."
 *
 * States: idle → submitting → submitted | error.
 */
export default function EnquiryForm({ mapLeft = false }) {
    const reduce = useReducedMotion();
    const { state: routeState } = useLocation();
    const formStartedAt = useRef(null);

    const [status, setStatus] = useState("idle"); // idle | submitting | submitted | saved-email-error | error
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            phone: "",
            interest: "",
            ageGroup: "",
            message: "",
            company: "",
        },
    });

    // A class card can pre-select the interest before the visitor arrives.
    useEffect(() => {
        const routeInterest = routeState?.interest;
        if (routeInterest && INTERESTS.includes(routeInterest)) {
            setValue("interest", routeInterest, { shouldValidate: true });
        }

        const onInterest = (event) => {
            const interest = event.detail?.interest;
            if (interest && INTERESTS.includes(interest)) {
                setValue("interest", interest, { shouldValidate: true });
            }
        };
        window.addEventListener("km:interest", onInterest);
        return () => window.removeEventListener("km:interest", onInterest);
    }, [routeState, setValue]);

    const onInvalid = (formErrors) => {
        setStatus("idle");
        const firstError = Object.values(formErrors)[0];
        toast.error(firstError?.message || "Please check the form and try again.");
    };

    const startFormTimer = () => {
        if (formStartedAt.current === null) {
            formStartedAt.current = Date.now();
        }
    };

    const onSubmit = async (values) => {
        // Spam guard: require a human amount of time on the form.
        if (
            formStartedAt.current === null ||
            Date.now() - formStartedAt.current < siteConfig.enquiry.minFillMs
        ) {
            const message = "Please take a moment to review your enquiry before submitting.";
            setStatus("error");
            setSubmitError(message);
            toast.error(message);
            return;
        }
        // Do not leave autofilled honeypot submissions looking like a silent failure.
        if (values.company) {
            const message = "Your enquiry could not be verified. Please check the form and try again.";
            setStatus("error");
            setSubmitError(message);
            toast.error(message);
            return;
        }

        try {
            setStatus("submitting");
            setSubmitError("");
            const result = await postApi("/contact/enquiries", values);
            if (!result?.id) {
                throw new Error("Your enquiry was not saved. Please try again.");
            }
            if (result?.emailSent === false) {
                setStatus("saved-email-error");
                toast.warning("Your enquiry was saved, but the email notification could not be sent.");
                return;
            }
            setStatus("submitted");
            toast.success("Your enquiry has been submitted successfully.");
        } catch (error) {
            setStatus("error");
            setSubmitError(error.message);
            toast.error(error.message || "Could not submit your enquiry. Please try again.");
        }
    };

    const busy = isSubmitting || status === "submitting";

    return (
        <section
            id="enquiry"
            data-tone="light"
            aria-labelledby="enquiry-title"
            className="section relative bg-white pb-12 lg:pb-16"
        >
            <div className="shell">
                <div className={`grid grid-cols-1 gap-y-12 lg:grid-cols-12 ${mapLeft ? "lg:gap-x-8" : "lg:gap-x-14"}`}>
                    {/* ── Left: heading + WhatsApp alternative ── */}
                    <div className={mapLeft ? "lg:col-span-6" : "lg:col-span-5"}>
                        {mapLeft ? (
                            <div className="overflow-hidden rounded-[20px] border border-rule bg-white shadow-[0_24px_60px_-38px_rgba(41,33,43,0.4)]">
                                <div className="flex items-center gap-4 p-5 sm:px-7 sm:py-6">
                                    <span
                                        aria-hidden="true"
                                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blossom text-rose"
                                    >
                                        <MapPin className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="eyebrow text-rose">Visit the studio</p>
                                        <h2
                                            id="enquiry-title"
                                            className="mt-1 font-display text-[1.5rem] leading-tight text-text sm:text-[1.75rem]"
                                        >
                                            Find us in Noida
                                        </h2>
                                        <p className="mt-1 text-sm text-muted">
                                            C-39, Block C, Sector 52, Noida
                                        </p>
                                    </div>
                                </div>
                                <div className="relative h-[300px] overflow-hidden bg-blossom sm:h-[360px] lg:h-[460px]">
                                    <iframe
                                        title="Kala Mandir Art and Dance Institute location map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.436013791609!2d77.37030229999999!3d28.586693800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5216ed51bf9%3A0x3b0c2a3c39d01ad8!2sKala%20Mandir%20Art%20and%20Dance%20Institute!5e0!3m2!1sen!2sin!4v1792840890097!5m2!1sen!2sin"
                                        className="absolute inset-0 h-full w-full border-0"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                </div>
                                <a
                                    href={contactLinks.map}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium text-rose transition-colors hover:text-pink"
                                >
                                    Get directions
                                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                                </a>
                            </div>
                        ) : (
                            <>
                                <SectionHeading
                                    id="enquiry-title"
                                    number="08"
                                    eyebrow="Trial class & enquiry"
                                    title={
                                        <>
                                            Your creative journey{" "}
                                            <span className="italic text-pink">
                                                starts here
                                            </span>
                                            .
                                        </>
                                    }
                                    standfirst="Tell us what you'd like to learn. We'll confirm availability, timing and everything else on WhatsApp."
                                />

                                <Reveal delay={0.1} className="mt-9">
                            {/* Obvious WhatsApp alternative */}
                            <a
                                href={contactLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-4 rounded-[14px] border border-rule bg-paper p-5 transition-colors duration-200 hover:border-[#25D366]/60 sm:items-center"
                            >
                                <span
                                    aria-hidden="true"
                                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
                                >
                                    <WhatsAppIcon className="h-5 w-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[15.5px] font-medium text-text">
                                        Prefer WhatsApp? Message us directly
                                    </span>
                                    <span className="mt-0.5 block text-[14px] text-muted">
                                        {siteConfig.whatsapp.display}
                                    </span>
                                </span>
                                <ArrowUpRight
                                    aria-hidden="true"
                                    className="mt-3 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:mt-0"
                                />
                            </a>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <a
                                    href={contactLinks.phones[0]}
                                    className="rounded-[12px] border border-rule py-3.5 text-center text-[14px] text-text transition-colors duration-200 hover:border-text"
                                >
                                    Call the studio
                                </a>
                                <a
                                    href={contactLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-[12px] border border-rule py-3.5 text-center text-[14px] text-text transition-colors duration-200 hover:border-text"
                                >
                                    Instagram
                                </a>
                            </div>

                            {/* Honest privacy note */}
                            <p className="mt-6 border-t border-rule pt-4 text-[13.5px] leading-relaxed text-muted">
                                Your details are saved so our team can respond
                                to this enquiry. They are not used for unrelated
                                purposes.
                            </p>
                                </Reveal>
                            </>
                        )}
                    </div>

                    {/* ── Right: the form ── */}
                    <div className={mapLeft ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-7"}>
                        <Reveal delay={0.08}>
                            <form
                                onSubmit={handleSubmit(onSubmit, onInvalid)}
                                onFocusCapture={startFormTimer}
                                onChangeCapture={startFormTimer}
                                noValidate
                                aria-describedby="form-note"
                                className="rounded-[20px] border border-rule bg-white p-5 shadow-[0_24px_70px_-48px_rgba(53,21,54,0.32)] sm:p-7 lg:rounded-[24px] lg:p-9"
                            >
                                <div className="mb-7 border-b border-rule pb-5">
                                    <p className="eyebrow text-rose">A few details</p>
                                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                                        Tell us what you are looking for and we will help you find a place to begin.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6">
                                    {/* Name */}
                                    <Field
                                        id="name"
                                        label="Your name"
                                        required
                                        error={errors.name?.message}
                                    >
                                        <input
                                            id="name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="e.g. Ananya Sharma"
                                            className="field"
                                            aria-invalid={errors.name ? "true" : "false"}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                            {...register("name")}
                                        />
                                    </Field>

                                    {/* Phone */}
                                    <Field
                                        id="phone"
                                        label="Phone number"
                                        required
                                        error={errors.phone?.message}
                                    >
                                        <input
                                            id="phone"
                                            type="tel"
                                            inputMode="tel"
                                            autoComplete="tel"
                                            placeholder="98765 43210"
                                            className="field"
                                            aria-invalid={errors.phone ? "true" : "false"}
                                            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                                            {...register("phone")}
                                        />
                                        {!errors.phone && (
                                            <p id="phone-hint" className="mt-1.5 text-[12.5px] text-[#a08a97]">
                                                10-digit mobile number
                                            </p>
                                        )}
                                    </Field>

                                    {/* Interested in */}
                                    <Field
                                        id="interest"
                                        label="Interested in"
                                        required
                                        error={errors.interest?.message}
                                    >
                                        <select
                                            id="interest"
                                            className="field"
                                            aria-invalid={errors.interest ? "true" : "false"}
                                            aria-describedby={errors.interest ? "interest-error" : undefined}
                                            {...register("interest")}
                                        >
                                            <option value="">Select a class</option>
                                            {INTERESTS.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    {/* Age group (optional) */}
                                    <Field id="ageGroup" label="Age group" optional>
                                        <select
                                            id="ageGroup"
                                            className="field"
                                            {...register("ageGroup")}
                                        >
                                            <option value="">Prefer not to say</option>
                                            {AGE_GROUPS.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    {/* Message (optional) */}
                                    <Field
                                        id="message"
                                        label="Message"
                                        optional
                                        className="sm:col-span-2"
                                        error={errors.message?.message}
                                    >
                                        <textarea
                                            id="message"
                                            rows={3}
                                            placeholder="Anything we should know — experience level, preferred days, a performance coming up…"
                                            className="field"
                                            aria-invalid={errors.message ? "true" : "false"}
                                            aria-describedby={errors.message ? "message-error" : undefined}
                                            {...register("message")}
                                        />
                                    </Field>

                                    {/* Honeypot */}
                                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                                        <label htmlFor="company">Company</label>
                                        <input
                                            id="company"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="new-password"
                                            {...register("company")}
                                        />
                                    </div>
                                </div>

                                {/* Status region */}
                                <div aria-live="polite" className="mt-6">
                                    <AnimatePresence mode="wait" initial={false}>
                                        {status === "submitted" && (
                                            <StatusPanel
                                                key="submitted"
                                                tone="success"
                                                title="Your enquiry has been received"
                                                body="Thank you for contacting Kala Mandir. Your enquiry has been saved, and an email notification has been sent to our team."
                                                reduce={reduce}
                                            />
                                        )}

                                        {status === "saved-email-error" && (
                                            <StatusPanel
                                                key="saved-email-error"
                                                tone="warn"
                                                title="Your enquiry is saved"
                                                body="Your details are safely saved for the Kala Mandir team in the admin panel, but the email notification could not be sent. Please call or WhatsApp us if you need an immediate response."
                                                reduce={reduce}
                                            />
                                        )}

                                        {status === "error" && (
                                            <StatusPanel
                                                key="error"
                                                tone="warn"
                                                title="That didn't go through"
                                                body={`${submitError || "Your enquiry could not be submitted."} Please try again, or contact us directly by phone or WhatsApp.`}
                                                reduce={reduce}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Submit */}
                                <div id="form-note" className="mt-7 border-t border-rule pt-6">
                                    <button
                                        type="submit"
                                        disabled={busy}
                                        className={cn(
                                            "group inline-flex w-full items-center justify-center gap-2.5 rounded-[11px] px-7 py-4 text-[15.5px] font-medium tracking-[0.01em] transition-all duration-200 sm:w-auto",
                                            busy
                                                ? "cursor-wait bg-muted/50 text-white"
                                                : "bg-rose text-white hover:bg-pink",
                                        )}
                                    >
                                        {busy ? (
                                            <>
                                                <Loader2
                                                    className="h-4 w-4 animate-spin"
                                                    aria-hidden="true"
                                                />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Submit enquiry
                                                <ArrowUpRight
                                                    aria-hidden="true"
                                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                />
                                            </>
                                        )}
                                    </button>

                                </div>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
                limit={3}
            />
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Small internal pieces                                                       */
/* -------------------------------------------------------------------------- */

function Field({ id, label, required, optional, error, className, children }) {
    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="eyebrow mb-1.5 flex items-baseline gap-2 text-muted"
            >
                {label}
                {required && (
                    <span className="text-pink" aria-hidden="true">
                        *
                    </span>
                )}
                {optional && (
                    <span className="normal-case tracking-[0.05em] text-[#b0a0aa]">
                        optional
                    </span>
                )}
            </label>
            {children}
            {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
        </div>
    );
}

function FieldError({ id, children }) {
    return (
        <p
            id={id}
            role="alert"
            className="mt-1.5 flex items-start gap-1.5 text-[13px] text-[#b4462f]"
        >
            <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {children}
        </p>
    );
}

function StatusPanel({ tone, title, body, children, reduce }) {
    const success = tone === "success";
    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            role="status"
            className={cn(
                "rounded-[12px] border p-4 sm:p-5",
                success
                    ? "border-[#25D366]/40 bg-[#25D366]/[0.07]"
                    : "border-flame/45 bg-flame/[0.07]",
            )}
        >
            <div className="flex items-start gap-3">
                {success ? (
                    <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#1a9e4b]"
                        aria-hidden="true"
                    />
                ) : (
                    <TriangleAlert
                        className="mt-0.5 h-5 w-5 shrink-0 text-flame"
                        aria-hidden="true"
                    />
                )}
                <div className="min-w-0">
                    <p className="text-[15px] font-medium text-text">{title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">
                        {body}
                    </p>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

import checked from "../assets/icon-thank-you.svg"

function StepThanks() {
  return (
    <section
      role="region"
      aria-labelledby="thanks-heading"
      className="h-full md:w-lg flex flex-col md:justify-center gap-4 rounded-md bg-white px-6 py-16 text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4" aria-hidden="true">
        <img src={checked} alt="" aria-hidden="true" />
      </div>
      <h1
        id="thanks-heading"
        data-testid="thanks-title"
        className="text-3xl font-bold text-blue-950"
      >
        Thank You!
      </h1>
      <p role="status" aria-live="polite" className="text-gray-500">
        Thank you! Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to email
        us at{" "}
        <a href="" className="underline">
          support@loremgaming.com
        </a>
      </p>
    </section>
  )
}

export default StepThanks

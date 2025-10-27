import checked from "../assets/icon-thank-you.svg"

function StepThanks() {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white px-6 py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-4">
        <img src={checked} alt="Thank you icon" />
      </div>
      <h1 className="text-2xl font-bold text-blue-950">Thank You!</h1>
      <p className="text-gray-500">
        Thank you! Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to email
        us at support@loremgaming.com.
      </p>
    </div>
  )
}

export default StepThanks

/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/** @format */

export default function MembershipPricing() {
    const plans = [
        {
            title:  " Basic Plan",
            price: "₦50,750 / $35",
            discount: "₦72,500 / $50",
            button: "Get plan",
            border: "border-[#32CD32]",
            features: [
                "Mental Health Capacity Building",
                "Healthy Productive Outcomes",
                "Relapse Prevention",
            ],
        },
        {
            highlight: true,
            title: "Premium Plan",
            price: "₦101,500 / $70",
            discount: "₦50,000 / $100",
            button: "Get plan",
            border: "border-[#32CD32]",
            features: [
                "Mental health capacity building",
                "Rejuvination of mind and body",
                "Recovery from Addiction",
                "Relapse Prevention",
                "Reintegration Into the Society",
                "Follow Up",
            ],
        },
    ];

    return (
        <>
            <div>
                <section className="px-4 md:px-[50px] mt-[220px]">
                    {/* Changed background container from bg-white/10 to bg-white */}
                    <div className="max-w-[1340px] mx-auto items-center gap-[99px] justify-between bg-white rounded-[21px] md:rounded-[44px] px-4 py-[45px] md:px-[50px] md:py-[105px]">

                        {/* Header */}
                        <div className="flex flex-col mx-auto max-w-[570px] items-center justify-center">
                            <div className="flex items-center justify-center space-x-4">
                                <span className="w-16 h-0.5 bg-[#32CD32]"></span>
                                <h2 className="lg:text-2xl font-play text-sm font-semibold text-[#32CD32]">
                                    Pricing
                                </h2>
                                <span className="w-16 h-0.5 bg-[#32CD32]"></span>
                            </div>

                            <div className="text-center pt-[37px] italic font-black text-base md:text-[40px] leading-10 py-5">
                                <h1 className="text-[#32CD32] font-play-italic">
                                    Choose Your Plan.
                                </h1>
                            </div>

                            <p className="text-lg text-center text-[#32CD32]">
                                From single sessions to ongoing care, <br />
                                find the right path for your healing and growth.
                            </p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            {plans.map((plan, i) => (
                                <div
                                    key={i}
                                    className={`bg-slate-50/50 border ${plan.border} rounded-xl md:h-[501px] p-6 flex flex-col justify-between`}
                                >
                                    {/* Top */}
                                    <div>
                                        {/* Changed text-white to text-slate-900 */}
                                        <h3 className="text-[32px] font-semibold mb-4 text-slate-900">
                                            {plan.title}
                                        </h3>

                                        <div
                                            className={`w-full h-px mb-6  ${
                                                plan.highlight
                                                    ? "bg-[#32CD32]"
                                                    : "bg-slate-200"
                                            }`}
                                        />

                                        <ul className="pt-[25px] space-y-2 mb-3">
                                            {plan.features.map((feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center gap-3.5 pt-2"
                                                >
                                                    <img
                                                        src={"/icons/fast-time.webp"}
                                                        alt="icon"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {/* Changed text-white to text-slate-700 */}
                                                    <p className="text-sm font-normal text-slate-700 font">
                                                        {feature}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className={`w-full h-px mb-6 ${
                                            plan.highlight
                                                ? "bg-[#32CD32]"
                                                : "bg-slate-200"
                                        }`}
                                    />

                                    {/* Bottom */}
                                    <div>
                                        {/* Changed text-white to text-slate-900 and text-slate-500 */}
                                        <p className="text-[25px] md:text-[20px] font-bold mb-2 py-0 text-slate-900">
                                            {plan.price}
                                            <span className="text-slate-500 text-sm"> / Hour</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
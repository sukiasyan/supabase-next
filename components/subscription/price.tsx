import {CheckCircle2} from "lucide-react";

import {cn} from "@/lib/utils";
import Checkout from "@/components/subscription/Checkout";

export default function Price ()  {
  const price = [
    {
      tittle: "Hobby",
      description: "Start your next project",
      benefits: ["Cost saving","livetime support","Secure improvement",],
      ammount: 10,
      priceId: "price_1T3OMAJFJDazpOTLp4hNPYTk"

    },
    {
      tittle: "Pro",
      description: "Start your PRO project",
      benefits: ["Cost High","livetime support","Secure improvement","and more ..."],
      ammount: 20,
      priceId: "price_1T3OMfJFJDazpOTL2sONEnO2"
    },
    {
      tittle: "Enterprice",
      description: "Start your Ent project",
      benefits: ["Cost High","livetime support","Secure improvement","and more ...", "additional support"],
      ammount: 30,
      priceId: "price_1T3ONPJFJDazpOTL6CjJCckp"
    },
  ]
  return (
      <div>
      <div className="grid grid-col-1 md:grid-cols-3 gap-5">
        {price.map((item, index) => {
          const isPopular = index === 1

          return <div key={index} className={cn("border rounded-md p-5 space-y-5", {
            "ring-2 ring-green-500": isPopular
          })}>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">{item.tittle}</h1>
              <h1 className="text-3xl font-bold">{item.ammount}$</h1>
              <p className="text-sm text-gray-400 ">{item.description}</p>
            </div>
            <div className="space-y-3">
              {item.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2/>
                    <h1 className="text-sm text-gray-400">{benefit}</h1>
                  </div>
              ))}
            </div>
              <Checkout priceId={item.priceId}/>
          </div>

        })}
      </div>
      </div>
  );
};

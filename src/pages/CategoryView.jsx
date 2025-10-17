import Back from "@/components/ui/back";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetCarCategoriesQuery } from "@/store/services/adminApi";
import { PlusIcon } from "lucide-react";
import { useParams } from "react-router";

export default function CategoryView() {
  const { id } = useParams();
  const { data } = useGetCarCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.data?.categories?.find((i) => i._id === id),
    }),
  });

  return (
    <div>
      <Back />
      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <img
          src={data?.image?.url}
          alt={data?.category}
          className="size-80 rounded-lg border object-cover"
        />

        <div className="flex flex-col gap-6 self-start">
          <div>
            <h1 className="text-muted-foreground text-sm">Category</h1>
            <h2 className="text-2xl font-semibold capitalize">
              {data?.category}
            </h2>
          </div>
          <div className="space-y-6">
            {/* Car Names */}
            <div>
              <h3 className="flex items-center gap-2 font-medium">
                Car Names{" "}
                <PlusIcon
                  size={16}
                  className="bg-muted rounded-full hover:cursor-pointer"
                />
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {data?.carNames.map((car, idx) => (
                  <Badge key={idx} variant="secondary">
                    {car}
                  </Badge>
                ))}
              </div>
            </div>

            {/* City Overrides */}
            {data?.cityOverrides &&
              Object.keys(data?.cityOverrides).length > 0 && (
                <div>
                  <h3 className="mb-2 font-medium">City Specific Overrides</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(data?.cityOverrides).map(
                      ([city, price]) => (
                        <div
                          key={city}
                          className="flex items-center justify-between rounded-md border px-3 py-2"
                        >
                          <span className="font-medium">{city}</span>
                          <span className="text-muted-foreground">
                            ₹{price}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

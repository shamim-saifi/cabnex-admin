import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({
  title = "Default Title",
  stats = "$1,250.00",
  icon: Icon,
}) {
  return (
    <Card
      className={`from-chart-5 to-chart-1 @container/card bg-linear-to-tr dark:from-transparent dark:to-transparent`}
    >
      <CardHeader>
        <CardDescription className="text-accent font-medium">
          {title}
        </CardDescription>
        <CardTitle className="text-accent flex items-end gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {Icon && <Icon size={30} />} {stats}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

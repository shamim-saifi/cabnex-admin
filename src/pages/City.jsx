import AutopaginateTable from "@/components/auto-paginate-table";
import CarCategoryDialog from "@/components/car-category-dialog";
import DataTable from "@/components/manual-data-fetch-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import {
  useAddNewCityMutation,
  useGetCarCategoriesQuery,
  useGetCitiesQuery,
} from "@/store/services/adminApi";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { use, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const City = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, isLoading: loading } = useGetCitiesQuery();
  const { data: categories } = useGetCarCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.data?.categories.map((i) => ({
        _id: i._id,
        category: i.category,
      })),
    }),
  });
  const [addNewCity] = useAddNewCityMutation();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return toast("Please select a category");

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await addNewCity({
      city: data.city,
      state: data.state,
      category: [
        {
          type: selectedCategory,
          baseFare: data.baseFare,
          perKmCharge: data.perKmCharge,
          perHourCharge: data.perHourCharge,
          marketFare: data.marketFare,
          freeKmPerDay: data.freeKmPerDay,
          freeHoursPerDay: data.freeHoursPerDay,
          extraKmCharge: data.extraKmCharge,
          extraHourCharge: data.extraHourCharge,
          driverAllowance: data.driverAllowance,
          nightCharge: data.nightCharge,
          hillCharge: data.hillCharge,
          taxSlab: data.taxSlab,
        },
      ],
    })
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        toast.success("Add more categories from city view");
        form.reset();
        setSelectedCategory("");
      })
      .catch((err) => {
        toast.error(err?.data?.message || err.error);
      });
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <div className="font-medium capitalize">
          {row.getValue("city").split("-").join(" ")}
        </div>
      ),
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("state").split("-").join(" ")}
        </div>
      ),
    },
    {
      accessorKey: "category.type",
      header: "Categories",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.category.map((i) => i.type.category).join(", ")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="float-right">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-0.5" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original._id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to={`/city/${row.original._id}`}>
                <DropdownMenuItem>View City</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-chart-1 mb-4 flex items-center justify-between space-y-2 rounded-md px-4 py-2">
        <h4 className="mb-0 scroll-m-20 text-left text-2xl font-bold text-balance">
          Add City
        </h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add City</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Enter state name"
                    required
                  />
                </div>
                {/* Category fields */}
                <div className="space-y-2">
                  <Label>Select Category</Label>
                  <Select
                    name="categoryId"
                    value={selectedCategory}
                    onValueChange={(val) => setSelectedCategory(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((i) => (
                        <SelectItem key={i._id} value={i._id}>
                          {i.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "baseFare",
                    "marketFare",
                    "perKmCharge",
                    "perHourCharge",
                    "freeKmPerDay",
                    "freeHoursPerDay",
                    "extraKmCharge",
                    "extraHourCharge",
                    "driverAllowance",
                    "nightCharge",
                    "hillCharge",
                    "taxSlab",
                  ].map((key) => (
                    <div key={key} className="grid gap-2">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </Label>
                      <Input
                        id={key}
                        name={key}
                        type="number"
                        placeholder={0}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <AutopaginateTable columns={columns} data={data?.data?.cities || []} />
    </div>
  );
};

export default City;

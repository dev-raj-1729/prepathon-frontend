"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA_DOMAIN } from "@/config/endpoints";
import { Dataset, DatasetVisibility } from "@/types/dataset";
import axios from "axios";
import { Eye, EyeOff, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the Dataset type
// type Dataset = {
//   _id: string;
//   name: string;
//   visibility: "public" | "private";
//   owner: {
//     name: string;
//     photo_url: string;
//   };
// };

// Sample dataset data
// const initialDatasets: Dataset[] = [
//   {
//     _id: "1",
//     name: "Climate Change Data",
//     visibility: "public",
//     owner: {
//       name: "Alice Johnson",
//       photo_url: "/placeholder.svg?height=32&width=32",
//     },
//   },
//   {
//     _id: "2",
//     name: "Financial Transactions",
//     visibility: "private",
//     owner: {
//       name: "Bob Smith",
//       photo_url: "/placeholder.svg?height=32&width=32",
//     },
//   },
//   {
//     _id: "3",
//     name: "User Behavior Analytics",
//     visibility: "private",
//     owner: {
//       name: "Charlie Brown",
//       photo_url: "/placeholder.svg?height=32&width=32",
//     },
//   },
//   {
//     _id: "4",
//     name: "Global Population Statistics",
//     visibility: "public",
//     owner: {
//       name: "Diana Prince",
//       photo_url: "/placeholder.svg?height=32&width=32",
//     },
//   },
//   {
//     _id: "5",
//     name: "COVID-19 Cases",
//     visibility: "public",
//     owner: {
//       name: "Ethan Hunt",
//       photo_url: "/placeholder.svg?height=32&width=32",
//     },
//   },
// ];

export default function DatasetList() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const router = useRouter();
  //   const toggleVisibility = (id: string) => {
  //     setDatasets(
  //       datasets.map((dataset) =>
  //         dataset._id === id
  //           ? {
  //               ...dataset,
  //               visibility:
  //                 dataset.visibility === "public" ? "private" : "public",
  //             }
  //           : dataset
  //       )
  //     );
  //   };

  useEffect(() => {
    axios
      .get<{ datasets: Array<Dataset> }>(DATA_DOMAIN + "/api/v1/datasets")
      .then((res) => {
        setDatasets(res.data.datasets);
      });
  }, []);

  function handleRowClick(dataset: Dataset) {
    router.push("datasets/" + dataset._id);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Datasets</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datasets.map((dataset) => (
            <TableRow
              key={dataset._id}
              onClick={() => handleRowClick(dataset)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{dataset.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={dataset.owner.photo_url}
                      alt={dataset.owner.name}
                    />
                    <AvatarFallback>
                      {dataset.owner.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{dataset.owner.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    dataset.visibility === DatasetVisibility.PUBLIC
                      ? "default"
                      : "secondary"
                  }
                >
                  {dataset.visibility.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(dataset._id)}
                    >
                      Copy dataset ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      {dataset.visibility === DatasetVisibility.PUBLIC ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          <span>Make Private</span>
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Make Public</span>
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

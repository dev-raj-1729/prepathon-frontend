"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DATA_DOMAIN } from "@/config/endpoints";
import { CompanyMeta } from "@/types/company";
import { DatasetPopulated } from "@/types/dataset";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DatasetPage() {
  const params = useParams();
  const datasetId = params.datasetId.toString() ?? "";
  const [dataset, setDataset] = useState<DatasetPopulated>();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function handleRowClick(company: CompanyMeta) {
    router.push("/datasets/" + datasetId + "/companies/" + company._id);
  }

  useEffect(() => {
    axios
      .get<{ dataset: DatasetPopulated }>(
        DATA_DOMAIN + "/api/v1/datasets/" + datasetId
      )
      .then((res) => {
        setDataset(res.data.dataset);
      });
  }, []);

  const filteredCompanies =
    dataset?.companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.country.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Company List</h1>
      <div className="mb-4">
        <Input
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company) => (
            <TableRow key={company._id} onClick={() => handleRowClick(company)}>
              <TableCell>{company.serial_no}</TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredCompanies.length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No companies found.
        </p>
      )}
    </div>
  );
}

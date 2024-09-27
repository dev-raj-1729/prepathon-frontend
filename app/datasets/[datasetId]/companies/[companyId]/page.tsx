"use client";
import { useParams } from "next/navigation";

export default function CompanyPage() {
  const params = useParams();
  const companyId = params.companyId.toString() ?? "";

  return <div>{companyId}</div>;
}

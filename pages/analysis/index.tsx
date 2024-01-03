import React, { ReactNode } from "react";
import BreadcrumbLayout from "@components/common/Layout/breadcrumbLayout";
import Analysis from "@components/analysis";
import CommonModal from "@components/common/commonModel";

interface Breadcrumb {
  label: ReactNode;
  path: string;
}
interface MainIndexProps {
  children: ReactNode;
  breadcrumb: Breadcrumb[];
  breadcrumbTitle: string;
  description?: string;
}

const index: React.FC<MainIndexProps> = ({}) => {
  const breadcrumbsData: Breadcrumb[] = [
    {
      label: "Client Area",
      path: "/client-area",
    },
    {
      label: "Analysis",
      path: "#",
    },
  ];
  return (
    <BreadcrumbLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Profile">
        <Analysis />
    </BreadcrumbLayout>
  );
};

export default index;

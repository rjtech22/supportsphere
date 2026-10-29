import { StaticInfoPage, staticInfoMetadata } from "@/components/StaticInfoPage";
export const metadata = staticInfoMetadata("about");
export default function Page() { return <StaticInfoPage page="about" />; }

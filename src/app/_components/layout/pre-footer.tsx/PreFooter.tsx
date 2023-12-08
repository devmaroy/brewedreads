import PreFooterLogo from "@/app/_components/layout/pre-footer.tsx/PreFooterLogo";
import PreFooterMenu from "@/app/_components/layout/pre-footer.tsx/PreFooterMenu";

const PreFooter = () => {
  return (
    <aside className="lg:flex">
      <PreFooterLogo />
      <PreFooterMenu />
    </aside>
  );
};

export default PreFooter;

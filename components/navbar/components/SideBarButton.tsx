'use client';

interface SideBarButtonProps {
  open: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ open, setSideBar }) => {
  return (
    <button
      type="button"
      aria-label="Open menu"
      aria-controls="site-menu-dialog"
      aria-expanded={open}
      className="grid h-10 w-10 place-items-center rounded-lg bg-surface-container text-primary transition-colors hover:bg-surface-high"
      onClick={() => setSideBar((prev) => !prev)}
    >
      <span className="block h-[2px] w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
    </button>
  );
};

export default SideBarButton;

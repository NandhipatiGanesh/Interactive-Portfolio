import { LinkButton } from "./Button";
import { BOOK_URL } from "./constants";

export function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white px-8 py-2 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08),0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09)]">
      <span className="font-serif-accent text-2xl font-semibold text-[#051A24]">
        G
      </span>
      <LinkButton href={BOOK_URL} className="!px-5 !py-2 text-sm">
        Start a chat
      </LinkButton>
    </nav>
  );
}

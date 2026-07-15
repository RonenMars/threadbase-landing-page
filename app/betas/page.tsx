import { BetasPage } from "@/components/BetasPage";

export const metadata = {
  title: "Threadbase — Beta Programs",
  description:
    "Join the Threadbase beta on iOS via TestFlight or Android via Google Play. Get early access to the mobile companion for Claude Code.",
};

export default function BetasPageRoute(): React.JSX.Element {
  return <BetasPage />;
}

import { get } from "./actions";
import { Charts } from "./charts";

export default async function Home() {
  const data = await get();

  return (
    <main>
      <Charts data={data} />
    </main>
  );
}

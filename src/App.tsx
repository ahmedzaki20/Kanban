import Board from "./components/Board";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Kanban Board</h1>
        <SearchBar />
      </header>
      <Board />
    </main>
  );
}

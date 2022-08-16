import SearchBox from "./SearchBox";

function Header() {
  return (
    <header className="bg-slate-300">
      <div className="flex items-center justify-between max-w-6xl p-5 mx-auto">
        <p className="font-bold">song mood analyser</p>
        <SearchBox handleSearch={(query) => alert(query)} />
      </div>
    </header>
  );
}

export default Header;

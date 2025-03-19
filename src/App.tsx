import React, { useState } from "react";

// Categorias de canais
const categories = [
  { id: "all", name: "Todos" },
  { id: "sports", name: "Esportes" },
  { id: "entertainment", name: "Entretenimento" },
  { id: "news", name: "Notícias" },
  { id: "documentaries", name: "Documentários" },
];

const channels = [
  {
    id: "espn",
    name: "ESPN",
    category: "sports",
    url: "https://embedcanaistv.com/espn/",
  },
  {
    id: "espn2",
    name: "ESPN 2",
    category: "sports",
    url: "https://embedcanaistv.com/espn2/",
  },
  {
    id: "sportv",
    name: "SporTV",
    category: "sports",
    url: "https://embedcanaistv.com/sportv/",
  },
  {
    id: "sportv2",
    name: "SporTV 2",
    category: "sports",
    url: "https://embedcanaistv.com/sportv2/",
  },
  {
    id: "globors",
    name: "Globo RS",
    category: "entertainment",
    url: "https://embedcanaistv.com/globors/",
  },
  {
    id: "discovery",
    name: "Discovery Channel",
    category: "documentaries",
    url: "https://embedcanaistv.com/discoverychannel/",
  },
  {
    id: "history",
    name: "History Channel",
    category: "documentaries",
    url: "https://embedcanaistv.com/history/",
  },
  {
    id: "multishow",
    name: "Multishow",
    category: "entertainment",
    url: "https://embedcanaistv.com/multishow/",
  },
];

function App() {
  const [selectedChannel, setSelectedChannel] = useState<
    (typeof channels)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<string[]>([]);
  const [isLoadingChannel, setIsLoadingChannel] = useState(false);

  // Função para alternar o tema claro/escuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Função para abrir o canal em uma nova aba
  const openChannel = (url: string) => {
    window.open(url, "_blank");
  };

  // Função para selecionar um canal para exibir internamente
  const selectChannel = (channel: (typeof channels)[0]) => {
    setIsLoadingChannel(true);
    setSelectedChannel(channel);

    // Adicionar à lista de recentemente assistidos
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((id) => id !== channel.id);
      return [channel.id, ...filtered].slice(0, 5);
    });

    // Simular um pequeno atraso para mostrar o carregamento
    setTimeout(() => {
      setIsLoadingChannel(false);
    }, 1000);
  };

  // Função para voltar à lista de canais
  const backToList = () => {
    setSelectedChannel(null);
  };

  // Função para toggle favorito
  const toggleFavorite = (channelId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  // Filtrar canais por categoria e busca
  const filteredChannels = channels.filter((channel) => {
    const matchesCategory =
      activeCategory === "all" || channel.category === activeCategory;
    const matchesSearch = channel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Organizar canais: favoritos primeiro, depois por categoria
  const organizedChannels = [...filteredChannels].sort((a, b) => {
    // Favoritados primeiro
    const aIsFavorite = favorites.includes(a.id);
    const bIsFavorite = favorites.includes(b.id);

    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;

    // Depois recentes
    const aIsRecent = recentlyWatched.includes(a.id);
    const bIsRecent = recentlyWatched.includes(b.id);
    const aRecentIndex = recentlyWatched.indexOf(a.id);
    const bRecentIndex = recentlyWatched.indexOf(b.id);

    if (aIsRecent && bIsRecent) return aRecentIndex - bRecentIndex;
    if (aIsRecent) return -1;
    if (bIsRecent) return 1;

    // Finalmente alfabético
    return a.name.localeCompare(b.name);
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white text-gray-800"
        } p-3 flex items-center justify-between shadow-md transition-colors duration-300`}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={backToList}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
            >
              <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
              <polyline points="17 2 12 7 7 2" />
            </svg>
            <h1 className="text-xl font-bold">Live TV Channels</h1>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {selectedChannel && (
            <button
              onClick={backToList}
              className={`flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm text-white transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m19 12-7-7v4C7 9 4 14 4 19c2.5-3.5 6-5.1 8-5.1V18l7-7z" />
              </svg>
              <span>Voltar</span>
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg md:hidden"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white text-gray-800"
          } p-4 shadow-md transition-all duration-300 animate-fadeIn`}
        >
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-800"
                    : isDarkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4">
        {selectedChannel ? (
          // Visualização do player com side panel
          <div className="flex gap-4 max-w-7xl mx-auto animate-fadeIn">
            {/* Player Section */}
            <div className="flex-1">
              <div
                className={`${
                  isDarkMode ? "bg-black" : "bg-gray-800"
                } rounded-xl overflow-hidden shadow-xl aspect-video relative`}
              >
                {isLoadingChannel ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <iframe
                    src={selectedChannel.url}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-autoplay allow-presentation"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    scrolling="no"
                    style={{ border: "none" }}
                    className="w-full h-full"
                  />
                )}
              </div>

              <div
                className={`mt-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl p-4 shadow-md transition-colors duration-300`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center">
                      {selectedChannel.name}
                      <button
                        onClick={(e) => toggleFavorite(selectedChannel.id, e)}
                        className={`ml-2 transition-transform duration-200 hover:scale-110 ${
                          favorites.includes(selectedChannel.id)
                            ? "text-red-500"
                            : isDarkMode
                            ? "text-gray-400"
                            : "text-gray-400"
                        }`}
                        aria-label={
                          favorites.includes(selectedChannel.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={
                            favorites.includes(selectedChannel.id)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`${
                            favorites.includes(selectedChannel.id)
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </h2>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {categories.find((c) => c.id === selectedChannel.category)
                        ?.name || "Canal"}
                    </p>
                  </div>
                  <button
                    onClick={() => openChannel(selectedChannel.url)}
                    className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Abrir em nova aba</span>
                  </button>
                </div>

                <div
                  className={`mt-4 pt-3 border-t ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  } transition-colors`}
                >
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Se o vídeo não iniciar automaticamente, tente clicar na área
                    do player ou abrir em uma nova aba.
                  </p>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div
              className={`w-80 flex-shrink-0 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl p-4 shadow-md transition-colors duration-300`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Outros Canais
              </h3>
              <div className="space-y-2">
                {organizedChannels
                  .filter((channel) => channel.id !== selectedChannel.id)
                  .map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => selectChannel(channel)}
                      className={`${
                        isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      } p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between group`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-500"
                        >
                          <rect
                            width="20"
                            height="15"
                            x="2"
                            y="7"
                            rx="2"
                            ry="2"
                          />
                          <polyline points="17 2 12 7 7 2" />
                        </svg>
                        <span
                          className={`font-medium ${
                            isDarkMode ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {channel.name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(channel.id, e)}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                          favorites.includes(channel.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={
                            favorites.includes(channel.id)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          // Lista de canais em grid
          <div className="max-w-6xl mx-auto animate-fadeIn">
            {/* Barra de pesquisa e categorias */}
            <div className="mb-6">
              <div
                className={`relative mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                <input
                  type="text"
                  placeholder="Buscar canal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-3 pl-10 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-800 focus:bg-gray-700"
                      : "bg-white border border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
                >
                  <path d="M21 21l-6-6" />
                  <circle cx="10.5" cy="10.5" r="4.5" />
                </svg>
              </div>

              {/* Categories (Desktop) */}
              <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      activeCategory === category.id
                        ? isDarkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800"
                        : isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mostrar favoritos e recentemente assistidos */}
            {(favorites.length > 0 || recentlyWatched.length > 0) && (
              <div className="mb-8">
                {favorites.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      ★ Favoritos
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {channels
                        .filter((channel) => favorites.includes(channel.id))
                        .map((channel) => (
                          <div
                            key={`fav-${channel.id}`}
                            onClick={() => selectChannel(channel)}
                            className={`${
                              isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                            } rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col`}
                          >
                            <div className="h-16 flex items-center justify-center p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                              >
                                <rect
                                  width="20"
                                  height="15"
                                  x="2"
                                  y="7"
                                  rx="2"
                                  ry="2"
                                />
                                <polyline points="17 2 12 7 7 2" />
                              </svg>
                            </div>
                            <div
                              className={`p-2 text-center ${
                                isDarkMode ? "bg-gray-750" : "bg-gray-50"
                              }`}
                            >
                              <p className="font-medium text-sm truncate">
                                {channel.name}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {recentlyWatched.length > 0 && (
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      Assistidos recentemente
                    </h3>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {recentlyWatched
                        .map((id) => channels.find((c) => c.id === id))
                        .filter(Boolean)
                        .map(
                          (channel) =>
                            channel && (
                              <div
                                key={`recent-${channel.id}`}
                                onClick={() => selectChannel(channel)}
                                className={`${
                                  isDarkMode
                                    ? "bg-gray-800 hover:bg-gray-750"
                                    : "bg-white hover:bg-gray-50"
                                } rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0 w-32`}
                              >
                                <div className="h-16 flex items-center justify-center p-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-500"
                                  >
                                    <rect
                                      width="20"
                                      height="15"
                                      x="2"
                                      y="7"
                                      rx="2"
                                      ry="2"
                                    />
                                    <polyline points="17 2 12 7 7 2" />
                                  </svg>
                                </div>
                                <div
                                  className={`p-2 text-center ${
                                    isDarkMode ? "bg-gray-750" : "bg-gray-50"
                                  }`}
                                >
                                  <p className="font-medium text-sm truncate">
                                    {channel.name}
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <h2
              className={`text-xl font-semibold mb-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : activeCategory !== "all"
                ? `Canais de ${
                    categories.find((c) => c.id === activeCategory)?.name
                  }`
                : "Todos os canais"}
            </h2>

            {/* Grid de canais */}
            {organizedChannels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {organizedChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-102 hover:translate-y-[-2px] duration-300 border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    } ${
                      favorites.includes(channel.id)
                        ? isDarkMode
                          ? "ring-1 ring-yellow-500"
                          : "ring-1 ring-yellow-400"
                        : ""
                    }`}
                  >
                    <div
                      className={`aspect-video ${
                        isDarkMode ? "bg-gray-750" : "bg-gray-100"
                      } flex items-center justify-center cursor-pointer relative overflow-hidden group`}
                      onClick={() => selectChannel(channel)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 transition-transform duration-300 group-hover:scale-110"
                      >
                        <rect
                          width="20"
                          height="15"
                          x="2"
                          y="7"
                          rx="2"
                          ry="2"
                        />
                        <polyline points="17 2 12 7 7 2" />
                      </svg>

                      {/* Play overlay on hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <div className="bg-blue-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon
                              points="5 3 19 12 5 21 5 3"
                              fill="white"
                            ></polygon>
                          </svg>
                        </div>
                      </div>

                      {/* Favorite button */}
                      <button
                        className={`absolute top-2 right-2 p-1.5 rounded-full ${
                          isDarkMode ? "bg-gray-900" : "bg-white"
                        } bg-opacity-70 transition-all opacity-0 group-hover:opacity-100 hover:bg-opacity-100`}
                        onClick={(e) => toggleFavorite(channel.id, e)}
                        aria-label={
                          favorites.includes(channel.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={
                            favorites.includes(channel.id)
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`${
                            favorites.includes(channel.id)
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>

                      {/* Category badge */}
                      <div
                        className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs ${
                          isDarkMode
                            ? "bg-gray-900 bg-opacity-70"
                            : "bg-gray-200 bg-opacity-80"
                        }`}
                      >
                        {
                          categories.find((c) => c.id === channel.category)
                            ?.name
                        }
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg">
                          {channel.name}
                        </h3>
                        {favorites.includes(channel.id) && (
                          <span className="text-yellow-500">★</span>
                        )}
                      </div>
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={() => selectChannel(channel)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm text-white transition-colors"
                        >
                          Assistir aqui
                        </button>
                        <button
                          onClick={() => openChannel(channel.url)}
                          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`text-center py-12 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                } rounded-lg`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    } p-3 mb-4`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Nenhum canal encontrado
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    } text-sm`}
                  >
                    Tente uma busca diferente ou selecione outra categoria
                  </p>
                  {activeCategory !== "all" && (
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                    >
                      Ver todos os canais
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`mt-8 py-4 px-4 ${
          isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
        } text-sm text-center`}
      >
        <p>Desenvolvido com ❤️ para uma melhor experiência de TV online</p>
      </footer>
    </div>
  );
}

// Adicione estes estilos no seu arquivo de CSS ou tailwind.config.js
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.3s ease-out forwards;
// }

export default App;

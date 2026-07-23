"use client";

import { useEffect, useMemo, useState } from "react";

type Market = {
  commodity: string;
  variety: string;
  market: string;
  price: number;
  day: number;
  week: number;
  volume: string;
  availability: "High" | "Medium" | "Low";
  updated: string;
  points: number[];
};

const markets: Market[] = [
  {
    commodity: "Maize",
    variety: "Yellow maize",
    market: "Kano",
    price: 298000,
    day: 0.8,
    week: 4.5,
    volume: "12,000 MT",
    availability: "High",
    updated: "5 min ago",
    points: [35, 42, 38, 48, 51, 55, 61],
  },
  {
    commodity: "Rice",
    variety: "Paddy rice",
    market: "Niger",
    price: 610000,
    day: -1.2,
    week: -2.1,
    volume: "7,200 MT",
    availability: "Medium",
    updated: "12 min ago",
    points: [69, 64, 66, 58, 60, 54, 49],
  },
  {
    commodity: "Millet",
    variety: "Pearl millet",
    market: "Sokoto",
    price: 265000,
    day: 2.3,
    week: 6.8,
    volume: "9,450 MT",
    availability: "High",
    updated: "19 min ago",
    points: [31, 34, 39, 42, 45, 55, 64],
  },
  {
    commodity: "Groundnut",
    variety: "Shelled",
    market: "Kaduna",
    price: 520000,
    day: 1.7,
    week: 3.1,
    volume: "4,100 MT",
    availability: "Medium",
    updated: "24 min ago",
    points: [43, 46, 41, 50, 52, 57, 61],
  },
  {
    commodity: "Cowpea",
    variety: "Brown beans",
    market: "Kano",
    price: 468000,
    day: 2.8,
    week: 5.2,
    volume: "8,700 MT",
    availability: "High",
    updated: "31 min ago",
    points: [38, 43, 41, 47, 56, 61, 69],
  },
  {
    commodity: "Sorghum",
    variety: "Red sorghum",
    market: "Zaria",
    price: 337500,
    day: -0.5,
    week: 1.5,
    volume: "5,300 MT",
    availability: "Low",
    updated: "43 min ago",
    points: [61, 57, 54, 59, 56, 60, 58],
  },
];

const format = new Intl.NumberFormat("en-NG");
const sessionKey = "egoole-admin-session";
const sessionUserKey = "egoole-admin-user";
const Icon = ({ children }: { children: string }) => (
  <span aria-hidden="true" className="icon">
    {children}
  </span>
);
const userName = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

function Sparkline({
  points,
  positive = true,
}: {
  points: number[];
  positive?: boolean;
}) {
  const path = points
    .map((p, i) => `${i * (100 / (points.length - 1))},${92 - p}`)
    .join(" ");
  return (
    <svg
      className="spark"
      viewBox="0 0 100 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points={path}
        fill="none"
        stroke={positive ? "#31c875" : "#ef6464"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PriceTicker() {
  const items = [...markets, ...markets];
  return (
    <div className="ticker" aria-label="Live commodity prices">
      <div className="ticker-track">
        {items.map((item, index) => (
          <div key={`${item.commodity}-${index}`}>
            <span>
              {item.commodity.toUpperCase()} · {item.market.toUpperCase()}
            </span>{" "}
            ₦{format.format(item.price)}{" "}
            <b className={item.day > 0 ? "up" : "down"}>
              {item.day > 0 ? "▲" : "▼"}
              {Math.abs(item.day)}%
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Login({
  back,
  enter,
}: {
  back: () => void;
  enter: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <main className="login-page">
      <section className="login-card">
        <button className="login-back" onClick={back}>
          ← Back to home
        </button>
        <a
          className="public-logo"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            back();
          }}
        >
          <b>e</b>egoole
        </a>
        <div className="login-copy">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Market intelligence, ready when you are.</h1>
          <p>Sign in to monitor prices, save markets, and receive alerts.</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (email === "admin@egoole.farm" && password === "123456") {
              setError("");
              enter();
            } else setError("Incorrect email or password.");
          }}
        >
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          <button className="start login-submit" type="submit">
            Sign in to dashboard <span>→</span>
          </button>
        </form>
        <p className="login-note">
          Use the administrator account to manage market prices.
        </p>
      </section>
      <aside className="login-aside">
        <p className="eyebrow">LIVE FROM THE MARKET</p>
        <h2>Make every trading decision with confidence.</h2>
        <div>
          <b>45+</b>
          <span>verified sellers active in Calabar and Kaduna</span>
        </div>
      </aside>
    </main>
  );
}

function UpdatePrices({ back }: { back: () => void }) {
  const [commodity, setCommodity] = useState(markets[0].commodity);
  const [price, setPrice] = useState(String(markets[0].price));
  const [saved, setSaved] = useState(false);
  return (
    <main className="update-page">
      <section className="update-card">
        <button className="update-back" onClick={back}>
          ← Back to dashboard
        </button>
        <p className="eyebrow">MARKET ADMINISTRATION</p>
        <h1>Update commodity price</h1>
        <p className="update-intro">
          Publish the latest verified price for a commodity market.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        >
          <label>
            Commodity
            <select
              value={commodity}
              onChange={(event) => {
                setCommodity(event.target.value);
                setSaved(false);
              }}
            >
              {markets.map((item) => (
                <option key={item.commodity}>{item.commodity}</option>
              ))}
            </select>
          </label>
          <label>
            Price per metric ton
            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setSaved(false);
              }}
              required
            />
          </label>
          <button className="start update-submit" type="submit">
            Save price update <span>→</span>
          </button>
        </form>
        {saved && (
          <p className="update-success" role="status">
            {commodity} price update saved.
          </p>
        )}
      </section>
    </main>
  );
}

export function CommodityManager({ back }: { back: () => void }) {
  const [mode, setMode] = useState<"update" | "add">("update");
  const [commodity, setCommodity] = useState(markets[0].commodity);
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");
  const [market, setMarket] = useState("");
  const [price, setPrice] = useState(String(markets[0].price));
  const [saved, setSaved] = useState(false);
  return (
    <main className="update-page">
      <section className="update-card">
        <button className="update-back" onClick={back}>
          ← Back to dashboard
        </button>
        <p className="eyebrow">MARKET ADMINISTRATION</p>
        <h1>{mode === "update" ? "Update commodity" : "Add new commodity"}</h1>
        <p className="update-intro">
          Keep the verified commodity directory current for every market.
        </p>
        <div className="manager-tabs">
          <button
            className={mode === "update" ? "active" : ""}
            onClick={() => {
              setMode("update");
              setSaved(false);
            }}
          >
            Update existing
          </button>
          <button
            className={mode === "add" ? "active" : ""}
            onClick={() => {
              setMode("add");
              setSaved(false);
            }}
          >
            Add new
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        >
          {mode === "update" ? (
            <label>
              Commodity
              <select
                value={commodity}
                onChange={(event) => {
                  setCommodity(event.target.value);
                  setSaved(false);
                }}
              >
                {markets.map((item) => (
                  <option key={item.commodity}>{item.commodity}</option>
                ))}
              </select>
            </label>
          ) : (
            <>
              <label>
                Commodity name
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setSaved(false);
                  }}
                  placeholder="e.g. Cassava"
                  required
                />
              </label>
              <label>
                Variety
                <input
                  value={variety}
                  onChange={(event) => setVariety(event.target.value)}
                  placeholder="e.g. White cassava"
                  required
                />
              </label>
              <label>
                Market
                <input
                  value={market}
                  onChange={(event) => setMarket(event.target.value)}
                  placeholder="e.g. Niger"
                  required
                />
              </label>
            </>
          )}
          <label>
            Price per metric ton
            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setSaved(false);
              }}
              required
            />
          </label>
          <button className="start update-submit" type="submit">
            {mode === "update" ? "Save price update" : "Add commodity"}{" "}
            <span>→</span>
          </button>
        </form>
        {saved && (
          <p className="update-success" role="status">
            {mode === "update"
              ? `${commodity} price update saved.`
              : `${name} added to the commodity directory.`}
          </p>
        )}
      </section>
    </main>
  );
}

export function UserDashboard({
  openExplorer,
  manage,
  signOut,
  userEmail,
}: {
  openExplorer: () => void;
  manage: () => void;
  signOut: () => void;
  userEmail: string;
}) {
  const displayName = userName(userEmail);
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <main className="terminal">
      <aside className="side">
        <button className="terminal-logo">
          <b>e</b>
          <span>egoole</span>
        </button>
        <p className="side-label">MARKET INTELLIGENCE</p>
        <nav>
          <button className="active">
            <Icon>◫</Icon>Dashboard
          </button>
          <button onClick={openExplorer}>
            <Icon>⌁</Icon>Markets
          </button>
          <button onClick={manage}>
            <Icon>↟</Icon>Update prices
          </button>
        </nav>
        <div className="side-bottom">
          <div className="profile-wrap">
            <button className="analyst" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}>
            <span>{initials}</span>
            <div>
              <strong>{displayName}</strong>
              <small>{userEmail}</small>
            </div>
              <b>⌄</b>
            </button>
            {profileOpen && <div className="profile-menu"><button>⚙ Settings</button><button onClick={signOut}>↪ Sign out</button></div>}
          </div>
        </div>
      </aside>
      <section className="terminal-main">
        <header className="terminal-top">
          <div className="dashboard-label">Dashboard</div>
          <div className="terminal-actions">
            <span className="market-open">
              <i />
              MARKETS OPEN
            </span>
            <button aria-label="Notifications">
              <Icon>♧</Icon>
            </button>
            <button aria-label="Profile" className="profile">
              {initials}
            </button>
          </div>
        </header>
        <div className="home-dashboard">
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Good morning, {displayName}.</h1>
          <p className="home-dashboard-intro">
            Track the markets you care about and keep commodity information up
            to date.
          </p>
          <div className="dashboard-actions">
            <button className="start" onClick={openExplorer}>
              Explore markets <span>→</span>
            </button>
            <button className="dashboard-secondary" onClick={manage}>
              Add or update commodity <span>↗</span>
            </button>
          </div>
          <section className="dashboard-overview">
            <article>
              <small>MARKETS TRACKED</small>
              <strong>
                42<span>+</span>
              </strong>
              <p>Across 18 states</p>
            </article>
            <article>
              <small>PRICE REPORTS</small>
              <strong>128</strong>
              <p>Updated today</p>
            </article>
            <article>
              <small>VERIFIED SELLERS</small>
              <strong>
                45<span>+</span>
              </strong>
              <p>Active this week</p>
            </article>
          </section>
          <section className="dashboard-lower">
            <div>
              <p className="eyebrow">QUICK ACTIONS</p>
              <h2>Keep the market current.</h2>
              <p>
                Add a new commodity or update the latest verified price from
                your market agents.
              </p>
              <button className="dashboard-secondary" onClick={manage}>
                Manage commodities <span>→</span>
              </button>
            </div>
            <div className="dashboard-note">
              <span>✦</span>
              <div>
                <b>Market pulse</b>
                <p>Rice prices are down 1.2% in Niger this week.</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export function Dashboard({
  exit,
  signOut,
  openUpdate,
  canManage,
  userEmail,
}: {
  exit: () => void;
  signOut: () => void;
  openUpdate: () => void;
  canManage: boolean;
  userEmail: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"price" | "week">("price");
  const [selected, setSelected] = useState<Market | null>(markets[0]);
  const [saved, setSaved] = useState<string[]>([]);
  const displayName = userName(userEmail);
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const [profileOpen, setProfileOpen] = useState(false);
  const rows = useMemo(
    () =>
      markets
        .filter((row) =>
          `${row.commodity} ${row.market}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "price" ? b.price - a.price : b.week - a.week,
        ),
    [query, sort],
  );
  const nav = [
    "Dashboard",
    "Markets",
    "Commodities",
    "Price Trends",
    "Forecasts",
    "Analytics",
    "Transport Calculator",
    "Verified Sellers",
    "Alerts",
    "News",
    ...(canManage ? ["Update prices"] : []),
  ];
  return (
    <main className="terminal">
      <aside className="side">
        <button className="terminal-logo" onClick={exit}>
          <b>e</b>
          <span>egoole</span>
        </button>
        <p className="side-label">MARKET INTELLIGENCE</p>
        <nav>
          {nav.map((item, index) => (
            <button
              key={item}
              className={index === 1 ? "active" : ""}
              onClick={() => {
                if (item === "Dashboard") window.location.href = "/dashboard";
                if (item === "Update prices") openUpdate();
              }}
            >
              <Icon>
                {["◫", "⌁", "◉", "⌇", "◌", "▦", "↝", "✓", "◷", "◈", "↟"][index]}
              </Icon>
              {item}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="profile-wrap">
            <button className="analyst" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}>
            <span>{initials}</span>
            <div>
              <strong>{displayName}</strong>
              <small>{userEmail}</small>
            </div>
              <b>⌄</b>
            </button>
            {canManage && profileOpen && <div className="profile-menu"><button>⚙ Settings</button><button onClick={signOut}>↪ Sign out</button></div>}
          </div>
        </div>
      </aside>
      <section className="terminal-main">
        <header className="terminal-top">
          <button className="dashboard-back" onClick={exit}>
            <span aria-hidden="true">←</span> Back to home
          </button>
          <label className="terminal-search">
            <Icon>⌕</Icon>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search markets, commodities, reports..."
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="terminal-actions">
            <span className="market-open">
              <i />
              MARKETS OPEN
            </span>
            <button aria-label="Notifications">
              <Icon>♧</Icon>
              <i className="notice" />
            </button>
            <button aria-label="Profile" className="profile">
              {initials}
            </button>
          </div>
        </header>
        <div className="terminal-ticker">
          <span>LIVE</span>
          <div className="terminal-ticker-window">
            <div className="terminal-ticker-track">
              <div>
                MAIZE / KANO <b>₦298,000</b> <em>▲0.8%</em>
              </div>
              <div>
                RICE / NIGER <b>₦610,000</b> <i>▼1.2%</i>
              </div>
              <div>
                COWPEA / KANO <b>₦468,000</b> <em>▲2.8%</em>
              </div>
              <div aria-hidden="true">
                MAIZE / KANO <b>₦298,000</b> <em>▲0.8%</em>
              </div>
              <div aria-hidden="true">
                RICE / NIGER <b>₦610,000</b> <i>▼1.2%</i>
              </div>
              <div aria-hidden="true">
                COWPEA / KANO <b>₦468,000</b> <em>▲2.8%</em>
              </div>
            </div>
          </div>
          <small>LAST UPDATED 10:42 WAT</small>
        </div>
        <div className="dashboard-title">
          <div>
            <p>
              MARKET OVERVIEW <span>•</span> TUESDAY, 21 JULY
            </p>
            <h1>Agricultural markets</h1>
          </div>
          <div className="dashboard-title-actions">
            {canManage && (
              <button className="update-link" onClick={openUpdate}>
                Update prices
              </button>
            )}
            <button className="export">
              <Icon>⇩</Icon>Export report
            </button>
          </div>
        </div>
        <section className="stat-grid">
          <article>
            <small>TOTAL MARKET VOLUME</small>
            <strong>
              ₦4.28<span>bn</span>
            </strong>
            <p className="up">
              ↑ 8.4% <span>vs last week</span>
            </p>
            <div className="bar-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </article>
          <article>
            <small>ACTIVE COMMODITIES</small>
            <strong>24</strong>
            <p className="up">
              ↑ 3 <span>this month</span>
            </p>
            <div className="ring">
              <b>82%</b>
              <span>verified</span>
            </div>
          </article>
          <article>
            <small>MARKET SENTIMENT</small>
            <strong>Positive</strong>
            <p>
              <span className="sentiment">
                <i /> 68
              </span>{" "}
              / 100
            </p>
            <div className="sentiment-line">
              <i />
            </div>
          </article>
          <article>
            <small>PRICE VOLATILITY</small>
            <strong>Moderate</strong>
            <p className="down">
              ↓ 12.6% <span>this week</span>
            </p>
            <Sparkline points={[56, 49, 58, 46, 50, 39, 44]} positive={false} />
          </article>
        </section>
        <section className="market-workspace">
          <div className="data-card">
            <div className="card-header">
              <div>
                <p>MARKET PRICES</p>
                <h2>Latest commodity prices</h2>
              </div>
              <div className="table-controls">
                <button
                  className={sort === "price" ? "selected" : ""}
                  onClick={() => setSort("price")}
                >
                  By price
                </button>
                <button
                  className={sort === "week" ? "selected" : ""}
                  onClick={() => setSort("week")}
                >
                  7D change
                </button>
                <button>⌄</button>
              </div>
            </div>
            <div className="market-table">
              <div className="row table-head">
                <span>COMMODITY</span>
                <span>MARKET</span>
                <button onClick={() => setSort("price")}>PRICE / MT ↕</button>
                <span>24H</span>
                <button onClick={() => setSort("week")}>7D CHANGE ↕</button>
                <span>TREND</span>
                <span>VOLUME</span>
                <span>STATUS</span>
              </div>
              {rows.map((row) => (
                <button
                  className="row data-row"
                  key={row.commodity}
                  onClick={() => setSelected(row)}
                >
                  <span className="commodity">
                    <b className={row.commodity.toLowerCase()}>
                      {row.commodity[0]}
                    </b>
                    <span>
                      <strong>{row.commodity}</strong>
                      <small>{row.variety}</small>
                    </span>
                  </span>
                  <span className="market-name">
                    {row.market}
                    <small>Nigeria</small>
                  </span>
                  <strong>₦{format.format(row.price)}</strong>
                  <span className={row.day > 0 ? "up" : "down"}>
                    {row.day > 0 ? "▲" : "▼"}
                    {Math.abs(row.day)}%
                  </span>
                  <span className={row.week > 0 ? "up" : "down"}>
                    {row.week > 0 ? "▲" : "▼"}
                    {Math.abs(row.week)}%
                  </span>
                  <Sparkline points={row.points} positive={row.week > 0} />
                  <span>{row.volume}</span>
                  <span className="verified">
                    <i />
                    Verified
                  </span>
                </button>
              ))}
            </div>
          </div>
          <aside className="intel">
            <div className="intel-title">
              <p>MARKET INTELLIGENCE</p>
              <span>✦ AI</span>
            </div>
            <article className="ai-brief">
              <small>AI MARKET BRIEF</small>
              <h3>Grain prices strengthen across Northern markets.</h3>
              <p>
                Increased institutional demand and tighter supply are supporting
                maize and cowpea prices this week.
              </p>
              <button>
                Read full analysis <b>→</b>
              </button>
            </article>
            <div className="intel-list">
              <h3>Top movers</h3>
              <p>
                <b>
                  <i className="dot maize-dot" /> Millet
                </b>
                <span className="up">+6.8%</span>
              </p>
              <p>
                <b>
                  <i className="dot cowpea-dot" /> Cowpea
                </b>
                <span className="up">+5.2%</span>
              </p>
              <p>
                <b>
                  <i className="dot rice-dot" /> Rice
                </b>
                <span className="down">−2.1%</span>
              </p>
            </div>
            <div className="supply-alert">
              <span>◷</span>
              <div>
                <b>Supply alert</b>
                <p>Low sorghum stock reported in Zaria.</p>
              </div>
            </div>
          </aside>
        </section>
      </section>
      {selected && (
        <aside className="detail-panel">
          <button
            className="close"
            onClick={() => setSelected(null)}
            aria-label="Close detail panel"
          >
            ×
          </button>
          <p>COMMODITY DETAIL</p>
          <div className="detail-commodity">
            <b className={selected.commodity.toLowerCase()}>
              {selected.commodity[0]}
            </b>
            <div>
              <h2>{selected.commodity}</h2>
              <span>
                {selected.variety} · {selected.market}
              </span>
            </div>
          </div>
          <div className="detail-price">
            <strong>₦{format.format(selected.price)}</strong>
            <span className="up">▲ {selected.week}% this week</span>
          </div>
          <div className="detail-chart">
            <div>
              <span>7 DAY PRICE TREND</span>
              <b>
                ₦{format.format(selected.price - 12000)} — ₦
                {format.format(selected.price)}
              </b>
            </div>
            <Sparkline points={selected.points} positive={selected.week > 0} />
          </div>
          <div className="detail-grid">
            <span>
              SUPPLY <b>Healthy</b>
            </span>
            <span>
              DEMAND <b>High</b>
            </span>
            <span>
              VOLUME <b>{selected.volume}</b>
            </span>
            <span>
              UPDATED <b>{selected.updated}</b>
            </span>
          </div>
          <div className="panel-section">
            <h3>
              AI summary <span>✦</span>
            </h3>
            <p>
              {selected.commodity} demand is trending upward, with strong
              movement from bulk buyers. Consider locking in inventory before
              the next market cycle.
            </p>
          </div>
          <div className="panel-section">
            <h3>Nearby markets</h3>
            <p className="nearby">
              <b>Kaduna Central</b>
              <span>₦{format.format(selected.price - 6500)}</span>
            </p>
            <p className="nearby">
              <b>Dawanau Market</b>
              <span>₦{format.format(selected.price + 3200)}</span>
            </p>
          </div>
          <button
            className="alert-btn"
            onClick={() =>
              setSaved((s) =>
                s.includes(selected.commodity)
                  ? s.filter((v) => v !== selected.commodity)
                  : [...s, selected.commodity],
              )
            }
          >
            {saved.includes(selected.commodity)
              ? "Alert enabled ✓"
              : "Set price alert"}
          </button>
        </aside>
      )}
    </main>
  );
}

export function Landing({
  enter,
  dashboard,
  login,
  authenticated,
}: {
  enter: () => void;
  dashboard: () => void;
  login: () => void;
  authenticated: boolean;
}) {
  return (
    <main className="site">
      <div className="announcement">
        <span>
          <i /> LIVE INTELLIGENCE FROM 42 NIGERIAN MARKETS
        </span>
        <a href="#markets">View live prices →</a>
      </div>
      <header className="public-nav">
        <a className="public-logo" href="#home">
          <b>e</b>egoole
        </a>
        <nav>
          <a href="#markets">Markets</a>
          <a href="#how">How it works</a>
          <a href="#coverage">Coverage</a>
          <a href="#insights">Insights</a>
        </nav>
        <div>
          {authenticated ? (
            <button onClick={dashboard} className="sign-in">
              Dashboard
            </button>
          ) : (
            <button onClick={login} className="sign-in">
              Sign in
            </button>
          )}
          <button onClick={enter} className="start">
            Explore markets <span>→</span>
          </button>
        </div>
      </header>
      <PriceTicker />
      <section className="public-hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">PROFESSIONAL MARKET INTELLIGENCE FOR AFRICA</p>
          <h1>
            Know what your
            <br />
            harvest is <em>worth.</em>
          </h1>
          <p>
            Nigeria&apos;s trusted agricultural market intelligence platform.
            Compare prices, monitor trends, discover buyers, and make better
            trading decisions.
          </p>
          <div className="hero-buttons">
            <button onClick={enter} className="start big">
              Explore markets <span>→</span>
            </button>
            <a href="#how" className="learn">
              Learn more <span>↓</span>
            </a>
          </div>
          <div className="farmer-proof">
            <div>
              <i>AO</i>
              <i>YA</i>
              <i>IB</i>
              <i>+8k</i>
            </div>
            <p>
              Trusted by{" "}
              <b>
                8,000+ farmers
                <br />
                and traders
              </b>{" "}
              across Nigeria
            </p>
          </div>
        </div>
        <div className="hero-pulse">
          <div className="pulse-head">
            <span>MARKET PULSE</span>
            <b>
              <i /> LIVE
            </b>
          </div>
          <p>
            Dawanau Market <small>Kano, Nigeria</small>
          </p>
          <strong>₦468,000</strong>
          <span className="per-ton">per metric ton</span>
          <div className="weekly up">
            ▲ 2.8% <span>this week</span>
          </div>
          <div className="hero-chart">
            <Sparkline points={[34, 38, 36, 43, 47, 44, 58, 61, 68]} />
          </div>
          <div className="pulse-foot">
            <span>
              <small>TOP COMMODITY</small>
              <b>Cowpea</b>
            </span>
            <span>
              <small>REPORTS TODAY</small>
              <b>
                128 <i />
              </b>
            </span>
          </div>
        </div>
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
      </section>
      <section className="site-stats">
        <div>
          <b>
            42<span>+</span>
          </b>
          <p>
            active markets
            <br />
            reporting today
          </p>
        </div>
        <div>
          <b>
            45<span>+</span>
          </b>
          <p>
            verified sellers in
            <br />
            Calabar &amp; Kaduna
          </p>
        </div>
        <div>
          <b>₦4.2bn</b>
          <p>
            commodity value
            <br />
            tracked weekly
          </p>
        </div>
        <div>
          <b>
            98<span>%</span>
          </b>
          <p>
            reports verified
            <br />
            within 24 hours
          </p>
        </div>
      </section>
      <section className="featured" id="markets">
        <div className="section-heading">
          <p className="eyebrow">LIVE MARKET PREVIEW</p>
          <h2>Markets in motion.</h2>
          <p>Clear, verified information from the places where food moves.</p>
        </div>
        <div className="featured-grid">
          {markets.slice(0, 3).map((item) => (
            <article key={item.commodity}>
              <div>
                <span className={`crop ${item.commodity.toLowerCase()}`}>
                  {item.commodity[0]}
                </span>
                <span>
                  <small>{item.market.toUpperCase()} MARKET</small>
                  <h3>{item.commodity}</h3>
                </span>
                <b className={item.week > 0 ? "up" : "down"}>
                  {item.week > 0 ? "▲" : "▼"}
                  {Math.abs(item.week)}%
                </b>
              </div>
              <strong>₦{format.format(item.price)}</strong>
              <small>per metric ton</small>
              <Sparkline points={item.points} positive={item.week > 0} />
            </article>
          ))}
        </div>
        <button onClick={enter} className="text-cta">
          View all live market prices <span>→</span>
        </button>
      </section>
      <section className="how" id="how">
        <div className="how-art">
          <span>
            VERIFIED
            <br />
            ON THE GROUND
          </span>
          <i />
          <i />
          <i />
        </div>
        <div>
          <p className="eyebrow">BETTER DATA, BETTER DECISIONS</p>
          <h2>
            Built around the
            <br />
            <em>real market.</em>
          </h2>
          <p>
            Local reporters collect and verify prices at the markets where
            business happens. No guesswork, no stale numbers—just useful
            intelligence when it matters.
          </p>
          <ul>
            <li>✓ Prices verified by local market agents</li>
            <li>✓ See price movement, not just a price</li>
            <li>✓ Alerts for the markets you care about</li>
          </ul>
          <button onClick={enter} className="text-cta">
            See the intelligence platform <span>→</span>
          </button>
        </div>
      </section>
      <section className="coverage" id="coverage">
        <p className="eyebrow">OUR MARKET COVERAGE</p>
        <h2>
          Connected to the heart
          <br />
          of Nigeria&apos;s food economy.
        </h2>
        <div className="coverage-chart">
          <div className="coverage-map">
            <svg
              viewBox="0 0 520 360"
              role="img"
              aria-label="Egoole market coverage across Nigeria"
            >
              <path
                className="country"
                d="M164 30 280 25 365 63 416 137 396 185 422 241 363 308 282 333 207 311 148 258 112 183 127 111Z"
              />
              <path
                className="region-line"
                d="M127 111 214 138 276 111 365 63M112 183 195 204 273 177 396 185M148 258 229 245 304 264 422 241"
              />
              <g className="map-node">
                <circle cx="254" cy="78" r="9" />
                <text x="269" y="74">
                  KANO
                </text>
                <text x="269" y="90">
                  8 MARKETS
                </text>
              </g>
              <g className="map-node">
                <circle cx="207" cy="151" r="9" />
                <text x="222" y="147">
                  KADUNA
                </text>
                <text x="222" y="163">
                  6 MARKETS
                </text>
              </g>
              <g className="map-node seller-node">
                <circle cx="330" cy="254" r="11" />
                <text x="345" y="250">
                  CALABAR
                </text>
                <text x="345" y="266">
                  45+ SELLERS
                </text>
              </g>
              <g className="map-node">
                <circle cx="190" cy="270" r="9" />
                <text x="205" y="266">
                  LAGOS
                </text>
                <text x="205" y="282">
                  7 MARKETS
                </text>
              </g>
              <g className="map-node">
                <circle cx="284" cy="197" r="8" />
                <text x="299" y="193">
                  BENUE
                </text>
                <text x="299" y="209">
                  5 MARKETS
                </text>
              </g>
            </svg>
            <div className="coverage-key">
              <span>
                <i /> Active market
              </span>
              <span>
                <i /> Seller hub
              </span>
            </div>
          </div>
          <div className="coverage-data">
            <p>LIVE NETWORK</p>
            <strong>
              42<span>+</span>
            </strong>
            <b>active market locations</b>
            <div className="region-bars">
              <div>
                <span>North West</span>
                <i>
                  <b style={{ width: "82%" }} />
                </i>
                <em>14</em>
              </div>
              <div>
                <span>North East</span>
                <i>
                  <b style={{ width: "48%" }} />
                </i>
                <em>8</em>
              </div>
              <div>
                <span>North Central</span>
                <i>
                  <b style={{ width: "64%" }} />
                </i>
                <em>11</em>
              </div>
              <div>
                <span>South</span>
                <i>
                  <b style={{ width: "53%" }} />
                </i>
                <em>9</em>
              </div>
            </div>
            <small>Updated today · 18 states covered</small>
          </div>
        </div>
      </section>
      <footer id="insights">
        <a className="public-logo" href="#home">
          <b>e</b>egoole
        </a>
        <p>Market intelligence for the people who feed Nigeria.</p>
        <small>© 2026 Egoole. Built for better decisions.</small>
      </footer>
    </main>
  );
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setAuthenticated(window.localStorage.getItem(sessionKey) === "true");
  }, []);
  return (
    <Landing
      enter={() => {
        window.location.href = "/markets";
      }}
      dashboard={() => {
        window.location.href = "/dashboard";
      }}
      login={() => {
        window.location.href = "/login";
      }}
      authenticated={authenticated}
    />
  );
}

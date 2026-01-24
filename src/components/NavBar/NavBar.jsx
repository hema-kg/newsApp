import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './NavBar.css'

export default function NavBar() {
  const [activeTab, setActiveTab] = useState('LATEST')
  const [mobileOpen, setMobileOpen] = useState(false)
  const tabs = ['LATEST', 'WORLD', 'SPORTS', 'CULTURE', 'WELNESS', 'ECONOMY']
  
  const renderIcon = (tab) => {
    switch(tab) {
      case 'WORLD':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h20M12 2c2.5 3 2.5 8 0 11M12 22c-2.5-3-2.5-8 0-11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/></svg>
        )
      case 'SPORTS':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M4 12c4 0 6-4 8-8M20 12c-4 0-6 4-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
        )
      case 'CULTURE':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="17" cy="14" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
        )
      case 'WELNESS':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 6.6a4.4 4.4 0 00-6.2 0L12 9.2l-2.6-2.6a4.4 4.4 0 10-6.2 6.2L12 22l8.8-9.6a4.4 4.4 0 000-6.2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )
      case 'ECONOMY':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 14l3-4 4 6 4-10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )
    }
  }
  const [articles, setArticles] = useState([])
  const [worldArticles, setWorldArticles] = useState([])
  const [sportsArticles, setSportsArticles] = useState([])
  const [cultureArticles, setCultureArticles] = useState([])
  const [wellnessArticles, setWellnessArticles] = useState([])
  const [economyArticles, setEconomyArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchArticles = async () => {
      setLoading(true)
      setError(null)
      try {
        const controller = new AbortController();
        // const res = await fetch('https://gist.githubusercontent.com/hema-kg/53d4833f99e297ab037049e0140583e2/raw/9ec7971697505897a4e7f8a4a669855737ceb3f5/latest.json', { signal: controller.signal })
        const res = await fetch('/latest.json', { signal: controller.signal })
        const data = await res.json()
        setArticles(data.articles || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
  
  const fetchSportsArticles = async () => {
      setLoading(true)
      setError(null) 
      try {
        const controller = new AbortController();
        // const res = await fetch('https://gist.githubusercontent.com/hema-kg/8907a21f1fd01c5111dd84b3fd7ac2c6/raw/0f9aee57b8cb8187e18a2afe628c69b15571ceb4/sports.json', { signal: controller.signal })
        const res = await fetch('/sports.json', { signal: controller.signal })
        const data = await res.json()
        setSportsArticles(data.articles || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
  }

  const fetchCultureArticles = async () => {
      setLoading(true)
      setError(null)      
      try { 
        const controller = new AbortController();
        // const res = await fetch('https://gist.githubusercontent.com/hema-kg/0f14a1565b1f34b2f19cc73dff9fdd4d/raw/c42a2fadcfcd0216595ec7b385b9c191245f1765/culture.json', { signal: controller.signal })
        const res = await fetch('/culture.json', { signal: controller.signal })
        const data = await res.json()
        setCultureArticles(data.articles || [])
      } catch (err) {       
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
  }

  const fetchWellnessArticles = async () => { 
      setLoading(true)
      setError(null)    
      try {
        const controller = new AbortController();
        // const res = await fetch('https://gist.githubusercontent.com/hema-kg/f28125c8ecccb868b0a04eaee7b7d861/raw/c95dba5e5c39a7edc64b695c85a11d12c4a91a19/welness.json', { signal: controller.signal })
        const res = await fetch('/welness.json', { signal: controller.signal })
        const data = await res.json()
        setWellnessArticles(data.articles || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
  }

  const fetchEconomyArticles = async () => {
      setLoading(true)
      setError(null)    
      try {
        const controller = new AbortController();
        // const res = await fetch('https://gist.githubusercontent.com/hema-kg/6992969ef8a8c983995fd99da37c449c/raw/d89f09b83eae4948bf4f66a3ad16523046331230/economy.json', { signal: controller.signal })
        const res = await fetch('/economy.json', { signal: controller.signal })
        const data = await res.json()
        setEconomyArticles(data.articles || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      } 
  }

  const fethworldArticles = async () => {
    setLoading(true)
    setError(null)
    try {
      const controller = new AbortController();
      // const res = await fetch('https://gist.githubusercontent.com/hema-kg/f382751897cd88058be694adf476c2b1/raw/f50cd24b7ecf19e9801ea5486712ff9b4107933d/world.json', { signal: controller.signal })
      const res = await fetch('/world.json', { signal: controller.signal })
      const data = await res.json()
      console.warn('World Articles Data:', data)
      setWorldArticles(data.articles || [])
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    if (activeTab === 'LATEST'){
      fetchArticles()
    }

    else if (activeTab === 'WORLD'){
      fethworldArticles();
    }

    else if (activeTab === 'SPORTS'){
      fetchSportsArticles();
    }

    else if (activeTab === 'CULTURE'){
      fetchCultureArticles();
    }

    else if (activeTab === 'WELNESS'){
      fetchWellnessArticles();
    }

    else if (activeTab === 'ECONOMY'){
      fetchEconomyArticles();
    }

    console.warn("Active Tab:", activeTab);
    return () => controller.abort()
  }, [activeTab])

  // Prevent background scroll and interactions when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (mobileOpen) document.body.classList.add('menu-open')
    else document.body.classList.remove('menu-open')
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  // create a portal node for the mobile overlay/menu so it isn't trapped in parent stacking contexts
  const portalNode = useRef(null)
  if (portalNode.current === null && typeof document !== 'undefined') {
    portalNode.current = document.createElement('div')
    portalNode.current.setAttribute('id', 'nav-portal')
  }
  useEffect(() => {
    if (!portalNode.current) return
    document.body.appendChild(portalNode.current)
    return () => {
      if (portalNode.current && portalNode.current.parentNode) document.body.removeChild(portalNode.current)
    }
  }, [])

  return (
    <div className="nav-wrapper d-flex flex-column align-items-center">
      <ul className="nav nav-tabs justify-content-center d-none d-md-flex" role="tablist">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <a
              href="#"
              className={"nav-link text-dark" + (activeTab === tab ? ' active' : '')}
              onClick={(e) => { e.preventDefault(); setActiveTab(tab) }}
              role="tab"
              aria-selected={activeTab === tab}
            >
              <span className="nav-label">{tab}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="d-block d-md-none w-100 px-3 m-2 top-left">
        <button
          className={"hamburger btn btn-outline-secondary" + (mobileOpen ? ' open' : '')}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span style={{ fontSize: '28px' }}>≡</span>
          <span className="visually-hidden">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        {/* render overlay/menu in a portal so it sits above all stacking contexts */}
        {portalNode.current ? createPortal(
          <div className={"mobile-menu-overlay" + (mobileOpen ? ' open' : '')} role="dialog" aria-hidden={!mobileOpen} onClick={() => setMobileOpen(false)}>
            <div className={"mobile-menu" + (mobileOpen ? ' open' : '')} onClick={(e) => e.stopPropagation()}>
              <button className="close-btn text-white" aria-label="Close menu" onClick={() => setMobileOpen(false)}>×</button>
              <div className="mobile-menu-header d-flex align-items-center">
                <div className="menu-brand">
                  <div className="avatar ms-auto" aria-hidden>
                    <img src="/news.png" alt="avatar" />
                  </div>
                  <span className="brand-dot">News</span>
                </div>
              </div>

              <nav aria-label="Mobile categories">
                <ul className="list-unstyled mt-3 mb-0">
                  {tabs.map((tab) => (
                    <li key={tab} className="mb-2">
                      <button
                        className={"nav-item-button w-100 text-start d-flex align-items-center" + (activeTab === tab ? ' active' : '')}
                        onClick={() => { setActiveTab(tab); setMobileOpen(false) }}
                        aria-current={activeTab === tab}
                      >
                        <span className="menu-icon me-3" aria-hidden>{renderIcon(tab)}</span>
                        <span className="menu-label">{tab}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        , portalNode.current) : null}
      </div>

      <div className="tab-content p-3" style={{ width: '100%', pointerEvents: mobileOpen ? 'none' : undefined }} aria-hidden={mobileOpen}>
        {activeTab === 'LATEST' && (
          <div className="tab-pane active">
            <h5>Latest</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {articles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                     <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'SPORTS' && (
          <div className="tab-pane active">
            <h5>Sports</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {sportsArticles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                    <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {activeTab === 'WORLD' && (
          <div className="tab-pane active">
            <h5>World</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {Array.isArray(worldArticles) ? worldArticles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                    <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        )}

        {activeTab === 'CULTURE' && (
          <div className="tab-pane active">
            <h5>Culture</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {cultureArticles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                    <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {activeTab === 'WELNESS' && (
          <div className="tab-pane active">
            <h5>Welness</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {wellnessArticles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                    <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ECONOMY' && (
          <div className="tab-pane active">
            <h5>Economy</h5>
            {loading && (
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <p>No articles found.</p>
            )}

            <div className="row">
              {economyArticles.map((a, idx) => (
                <div className="col-12 col-md-6 col-lg-4 mb-3" key={a.url || idx}>
                  <div className="card h-100">
                    <img src={a.urlToImage || "/news.png"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/news.png"; }} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{a.title}</h6>
                      <p className="card-text text-muted" style={{ flex: 1 }}>{a.description || a.content || 'No description'}</p>
                      <a href={a.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Read</a>
                    </div>
                    <div className="card-footer text-muted small">{a.source?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}


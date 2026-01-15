import React, { useState, useEffect } from 'react'
import './NavBar.css'

export default function NavBar() {
  const [activeTab, setActiveTab] = useState('LATEST')
  const tabs = ['LATEST', 'WORLD', 'SPORTS', 'CULTURE', 'WELNESS', 'ECONOMY']
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
        const res = await fetch('https://api.jsonblob.com/019bbd02-18cd-7477-8fed-4c6f2d13511e', { signal: controller.signal })
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
        const res = await fetch('https://api.jsonblob.com/019bbd0b-f99d-76e3-b71b-8bea844a7cc8', { signal: controller.signal })
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
        const res = await fetch('https://api.jsonblob.com/019bbd1c-31f4-7411-aef1-c794d0ad4b55', { signal: controller.signal })
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
        const res = await fetch('https://api.jsonblob.com/019bbd23-36fa-7a7d-bbb3-5c6ca7f64f02', { signal: controller.signal })
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
        const res = await fetch('https://api.jsonblob.com/019bbd2a-f2f9-71f3-8a18-6ce74d0d698f', { signal: controller.signal })
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
      const res = await fetch('https://api.jsonblob.com/019bc1c8-2016-73c7-b986-c40447163268', { signal: controller.signal })
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

  return (
    <div className="nav-wrapper d-flex flex-column align-items-center">
      <ul className="nav nav-tabs justify-content-center" role="tablist">
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

      <div className="tab-content p-3" style={{ width: '100%' }}>
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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
                    {a.urlToImage && <img src={a.urlToImage} className="card-img-top" alt={a.title} style={{ objectFit: 'cover', height: 160 }} />}
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


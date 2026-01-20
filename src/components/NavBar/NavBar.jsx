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
        const res = await fetch('https://gist.githubusercontent.com/hema-kg/53d4833f99e297ab037049e0140583e2/raw/9ec7971697505897a4e7f8a4a669855737ceb3f5/latest.json', { signal: controller.signal })
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
        const res = await fetch('https://gist.githubusercontent.com/hema-kg/8907a21f1fd01c5111dd84b3fd7ac2c6/raw/0f9aee57b8cb8187e18a2afe628c69b15571ceb4/sports.json', { signal: controller.signal })
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
        const res = await fetch('https://gist.githubusercontent.com/hema-kg/0f14a1565b1f34b2f19cc73dff9fdd4d/raw/c42a2fadcfcd0216595ec7b385b9c191245f1765/culture.json', { signal: controller.signal })
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
        const res = await fetch('https://gist.githubusercontent.com/hema-kg/f28125c8ecccb868b0a04eaee7b7d861/raw/c95dba5e5c39a7edc64b695c85a11d12c4a91a19/welness.json', { signal: controller.signal })
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
        const res = await fetch('https://gist.githubusercontent.com/hema-kg/6992969ef8a8c983995fd99da37c449c/raw/d89f09b83eae4948bf4f66a3ad16523046331230/economy.json', { signal: controller.signal })
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
      const res = await fetch('https://gist.githubusercontent.com/hema-kg/f382751897cd88058be694adf476c2b1/raw/f50cd24b7ecf19e9801ea5486712ff9b4107933d/world.json', { signal: controller.signal })
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


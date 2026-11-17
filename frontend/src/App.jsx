import { useEffect, useState } from 'react'
import './App.css'

const projects = [
  {
    id: 'morrow',
    name: 'Morrow Studio',
    category: 'Branding',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Ruang kerja modern dengan meja panjang dan cahaya matahari',
    description:
      'Identitas visual yang hangat dan fleksibel untuk studio interior yang percaya setiap ruang punya cerita.',
    services: 'Brand strategy · Visual identity · Art direction',
  },
  {
    id: 'forma',
    name: 'Forma Objects',
    category: 'Digital',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Objek dekorasi minimalis di atas rak kayu',
    description:
      'Pengalaman e-commerce yang sederhana dan menyenangkan untuk brand homeware independen.',
    services: 'UI/UX design · E-commerce · Development',
  },
  {
    id: 'sunday',
    name: 'Sunday Market',
    category: 'Digital',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Tampilan dashboard analitik di layar laptop',
    description:
      'Platform komunitas yang mempertemukan pembuat lokal dengan orang-orang yang menghargai karya mereka.',
    services: 'Product design · Prototyping · Development',
  },
]

const categories = ['Semua', 'Digital', 'Branding']

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [emailStatus, setEmailStatus] = useState('')

  const visibleProjects =
    activeFilter === 'Semua'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  useEffect(() => {
    if (!activeProject) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setActiveProject(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('halo@rakapratama.com')
      setEmailStatus('Email berhasil disalin!')
    } catch {
      setEmailStatus('Salin email: halo@rakapratama.com')
    }
  }

  function downloadResume() {
    const resume = [
      'RAKA PRATAMA — CREATIVE DEVELOPER',
      '',
      'Halo! Saya Raka, desainer dan developer yang membangun pengalaman digital dengan rasa.',
      '',
      'KEAHLIAN',
      'Product design, visual identity, React, UI engineering, prototyping',
      '',
      'PENGALAMAN',
      'Independent designer & developer — 2022–sekarang',
      'Bekerja bersama startup dan brand independen untuk menciptakan produk digital yang berkesan.',
      '',
      'KONTAK',
      'halo@rakapratama.com',
    ].join('\n')
    const file = new Blob([resume], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'raka-pratama-resume.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell" data-theme={darkMode ? 'dark' : 'light'}>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          <span className="wordmark-mark">r.</span>
          <span>Raka Pratama</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#work" onClick={closeMenu}>Karya</a>
          <a href="#about" onClick={closeMenu}>Tentang</a>
          <a href="#contact" onClick={closeMenu}>Kontak</a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {darkMode ? '☼' : '◐'}
            </span>
            <span>{darkMode ? 'Terang' : 'Gelap'}</span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> TERSEDIA UNTUK PROYEK BARU</p>
            <h1>
              Desain yang
              <br />
              terasa <span className="serif-word">berarti.</span>
            </h1>
            <p className="hero-description">
              Halo, saya Raka — creative developer yang merancang dan membangun
              pengalaman digital dengan rasa.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">
                Lihat karya <ArrowIcon />
              </a>
              <button className="button button--text" type="button" onClick={downloadResume}>
                Unduh resume <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="hero-meta">
              <span>BERBASIS DI</span>
              <span>Bandung, Indonesia <span aria-hidden="true">↗</span></span>
              <span className="meta-divider" />
              <span>WAKTU LOKAL</span>
              <span>{new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }).format(new Date())} WIB</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Foto profil Raka">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="portrait-frame">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90"
                alt="Potret Raka Pratama"
              />
            </div>
            <div className="sticker sticker--top">DESIGN<br />WITH FEELING</div>
            <div className="sticker sticker--bottom">
              <span className="sticker-sparkle" aria-hidden="true">✳</span>
              <span>Scroll untuk<br />lihat lebih banyak</span>
              <span aria-hidden="true">↓</span>
            </div>
            <span className="visual-caption">CREATIVE DEVELOPER · SINCE 2020</span>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 — PILIHAN KARYA</p>
              <h2>Hal yang saya <span className="serif-word">buat.</span></h2>
            </div>
            <p className="section-note">Beberapa kolaborasi pilihan<br />dari ide sampai jadi.</p>
          </div>

          <div className="project-toolbar">
            <span className="project-count">0{visibleProjects.length} PROYEK</span>
            <div className="filter-list" aria-label="Filter proyek">
              {categories.map((category) => (
                <button
                  className={activeFilter === category ? 'filter-chip is-active' : 'filter-chip'}
                  key={category}
                  type="button"
                  aria-pressed={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <button
                  className="project-image-button"
                  type="button"
                  aria-label={`Lihat detail ${project.name}`}
                  onClick={() => setActiveProject(project)}
                >
                  <img src={project.image} alt={project.imageAlt} loading="lazy" />
                  <span className="project-open"><ArrowIcon diagonal /></span>
                  <span className="project-index">0{index + 1}</span>
                </button>
                <div className="project-info">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.category} <span>·</span> {project.year}</p>
                  </div>
                  <button
                    className="project-detail-link"
                    type="button"
                    onClick={() => setActiveProject(project)}
                  >
                    Detail <ArrowIcon diagonal />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-label">
              <p className="eyebrow">02 — SEDIKIT TENTANG SAYA</p>
              <span className="about-asterisk" aria-hidden="true">✳</span>
            </div>
            <div className="about-copy">
              <h2>
                Saya percaya hal-hal digital yang hebat dimulai dari
                <span className="serif-word"> rasa ingin tahu.</span>
              </h2>
              <p>
                Dari strategi sampai baris kode terakhir, saya suka mencari
                cara agar produk terasa lebih manusiawi. Berkolaborasi dengan
                tim kecil, bergerak cepat, dan membuat sesuatu yang benar-benar
                berguna — itu cara kerja favorit saya.
              </p>
              <div className="skill-list">
                <span>Product design</span><span>Art direction</span>
                <span>Creative development</span><span>React</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <p className="eyebrow">03 — ADA IDE MENARIK?</p>
          <div className="contact-content">
            <h2>Yuk, bikin sesuatu<br /><span className="serif-word">yang berarti.</span></h2>
            <div className="contact-aside">
              <p>Punya proyek, ide, atau sekadar ingin ngobrol? Saya selalu terbuka untuk hal baik yang baru.</p>
              <a className="button button--primary" href="mailto:halo@rakapratama.com">
                Mulai obrolan <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="contact-email-row">
            <a href="mailto:halo@rakapratama.com">halo@rakapratama.com</a>
            <button type="button" onClick={copyEmail}>Salin email <span aria-hidden="true">↗</span></button>
            <span className="copy-status" role="status">{emailStatus}</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#home"><span className="wordmark-mark">r.</span><span>Raka Pratama</span></a>
        <span>Dibuat dengan rasa di Bandung <span aria-hidden="true">♡</span> 2025</span>
        <a href="#home" className="back-top">Kembali ke atas ↑</a>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null)
          }}
        >
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" type="button" aria-label="Tutup detail" onClick={() => setActiveProject(null)}>×</button>
            <img src={activeProject.image} alt={activeProject.imageAlt} />
            <p className="eyebrow">{activeProject.category} — {activeProject.year}</p>
            <h2 id="modal-title">{activeProject.name}</h2>
            <p>{activeProject.description}</p>
            <span className="modal-services">{activeProject.services}</span>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

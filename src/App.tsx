import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

const assets = import.meta.env.BASE_URL
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL?.trim()
const githubUrl = 'https://github.com/abiramjee'
const introFiles = ['intro-full-body.mp4', 'intro.mp4']

const skills = [
  { symbol: 'Py', name: 'Python', group: 'Languages', note: 'Recruiting backend, research assistant, and floorplan preprocessing.' },
  { symbol: 'Js', name: 'JavaScript', group: 'Languages', note: 'Responsive website maintenance at the Asian Cultures Center.' },
  { symbol: 'Ts', name: 'TypeScript', group: 'Languages', note: 'Recruiting prototype frontend and this portfolio.' },
  { symbol: 'Sq', name: 'SQL', group: 'Languages', note: 'Floorplan data preparation for AI research.' },
  { symbol: 'Re', name: 'React', group: 'Frontend', note: 'Recruiting UI, telemetry dashboards, and this portfolio.' },
  { symbol: 'Ht', name: 'HTML', group: 'Frontend', note: 'Accessibility and publishing updates for campus websites.' },
  { symbol: 'Cs', name: 'CSS', group: 'Frontend', note: 'Responsive interfaces and accessibility improvements.' },
  { symbol: 'St', name: 'Streamlit', group: 'Frontend', note: 'Interface for the multi-agent research assistant.' },
  { symbol: 'Fa', name: 'FastAPI', group: 'Backend', note: 'Recruiting prototype and multi-agent research assistant.' },
  { symbol: 'Sb', name: 'Spring Boot', group: 'Backend', note: 'REST services for the cloud-native platform.' },
  { symbol: 'Ap', name: 'REST APIs', group: 'Backend', note: 'Application integration and service development.' },
  { symbol: 'Jn', name: 'JSON', group: 'Backend', note: 'Structured data for software and integration workflows.' },
  { symbol: 'Pg', name: 'PostgreSQL', group: 'Data', note: 'Data persistence for the cloud-native platform.' },
  { symbol: 'Ch', name: 'ChromaDB', group: 'Data', note: 'Semantic memory for the local research assistant.' },
  { symbol: 'Cv', name: 'OpenCV', group: 'Data', note: 'Preprocessing floorplan images for generative AI research.' },
  { symbol: 'Pt', name: 'PyTorch', group: 'Data', note: 'Supported experimentation in floorplan research.' },
  { symbol: 'Ag', name: 'AI agents', group: 'AI', note: 'Recruiting workflow validation and multi-agent research.' },
  { symbol: 'Ra', name: 'RAG', group: 'AI', note: 'Retrieval-augmented generation in the research assistant.' },
  { symbol: 'Lc', name: 'LangChain', group: 'AI', note: 'Application logic for the multi-agent research assistant.' },
  { symbol: 'Ol', name: 'Ollama', group: 'AI', note: 'Local model execution for research queries.' },
  { symbol: 'Pe', name: 'Prompt evaluation', group: 'AI', note: 'Evaluation of prompts in AI development workflows.' },
  { symbol: 'Wo', name: 'Workflow orchestration', group: 'AI', note: 'Handoffs and exception states in recruiting automation.' },
  { symbol: 'Gi', name: 'Git', group: 'Engineering', note: 'Version control for application and testing workflows.' },
  { symbol: 'Az', name: 'Azure DevOps', group: 'Engineering', note: 'Tracking dependencies and findings for the recruiting prototype.' },
  { symbol: 'Do', name: 'Docker', group: 'Engineering', note: 'Containerization for the cloud-native service platform.' },
  { symbol: 'Aw', name: 'AWS', group: 'Engineering', note: 'Deployment for the cloud-native service platform.' },
  { symbol: 'It', name: 'Integration testing', group: 'QA', note: 'Checking API behavior and inter-agent handoffs.' },
  { symbol: 'Tc', name: 'Test case design', group: 'QA', note: 'Turning requirements and expected behavior into testable scenarios.' },
  { symbol: 'Ua', name: 'UAT', group: 'QA', note: 'User acceptance testing and workflow validation.' },
  { symbol: 'Dt', name: 'Defect triage', group: 'QA', note: 'Documenting test findings, blockers, and dependencies.' },
]
const groups = ['All', ...new Set(skills.map(({ group }) => group))]

const projects = [
  { title: 'Recruiting Workflow Prototype', summary: 'An AI-assisted workflow connecting offer review, candidate follow-up, and onboarding.', detail: 'I tested frontend and backend workflows, investigated API issues, and validated the handoffs and exception states between agents.', stack: 'React · TypeScript · FastAPI', flow: ['Review', 'Offer', 'Acceptance', 'Onboarding'] },
  { title: 'Multi-Agent Research Assistant', summary: 'A local research tool that combines retrieval, semantic memory, and generated responses.', detail: 'I built its RAG pipeline, asynchronous retrieval, and Streamlit interface for contextual research queries.', stack: 'FastAPI · LangChain · ChromaDB · Ollama', flow: ['Query', 'Retrieve', 'Rank', 'Summarize'] },
  { title: 'Cloud-Native Service Platform', summary: 'A containerized service platform with Spring Boot APIs and PostgreSQL.', detail: 'I worked on API integration, containerization, automated testing, and deployment to AWS.', stack: 'Spring Boot · PostgreSQL · Docker · AWS', flow: ['Request', 'API', 'Database', 'Response'] },
]

const experience = [
  { role: 'AI / Software Engineering Intern', place: 'PreludeSys / Level Shift', dates: 'Jan 2025 onward', detail: 'Developed and validated multi-agent recruiting workflows, tested integrations, and documented exception states.' },
  { role: 'Business Systems Consultant Intermediate', place: 'State of Indiana, FSSA', dates: 'Sep–Current', detail: 'Documented eligibility-processing workflows, exceptions, decision points, and follow-up requirements.' },
  { role: 'B.S. in Computer Science', place: 'Indiana University Bloomington', dates: 'May 2026', detail: 'Graduated with an Artificial Intelligence focus.' },
  { role: 'Autonomous Racing Team Member', place: 'IU Luddy Autonomous Racing Team', dates: 'Dec 2024–May 2025', detail: 'Contributed to React telemetry dashboards and Python simulation and testing workflows.' },
  { role: 'Student Assistant / Web Designer', place: 'Asian Cultures Center', dates: 'Mar 2024–May 2025', detail: 'Maintained responsive web pages and improved accessibility using HTML, CSS, and JavaScript.' },
  { role: 'AI Research Assistant', place: 'Eskenazi School of Architecture & Design', dates: 'Jun–Aug 2024', detail: 'Processed floorplan images for model development and supported PyTorch experiments.' },
]

const highlights = [
  { type: 'AI research', value: '10,000+', title: 'Floorplan images processed', detail: 'Prepared image data for AI model development using Python, OpenCV, and SQL at the Eskenazi School of Architecture & Design.' },
  { type: 'Education', value: 'May 2026', title: 'Computer science graduation', detail: 'Completed my B.S. in Computer Science with an Artificial Intelligence focus at Indiana University Bloomington.' },
  { type: 'Applied AI', value: 'End to end', title: 'Testing the recruiting handoffs', detail: 'Validated how feedback review, offer preparation, acceptance, and onboarding connected in the prototype.' },
  { type: 'Software', value: 'Local AI', title: 'Building a research assistant', detail: 'Built a multi-agent research tool with asynchronous retrieval, semantic memory, and a Streamlit interface.' },
]

function Highlights() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const container = section.current
    const rail = track.current
    if (!container || !rail) return

    const desktop = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let distance = 0

    function update() {
      if (!container || !rail || !distance) return
      const offset = Math.min(distance, Math.max(0, -container.getBoundingClientRect().top))
      rail.scrollLeft = offset
    }

    function schedule() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    function measure() {
      if (!container || !rail) return
      distance = desktop.matches ? Math.max(0, rail.scrollWidth - rail.clientWidth) : 0
      container.classList.toggle('is-scroll-driven', distance > 0)
      container.style.setProperty('--travel', `${distance}px`)
      if (desktop.matches) rail.tabIndex = distance ? -1 : 0
      else rail.tabIndex = 0
      schedule()
    }

    const observer = new ResizeObserver(measure)
    observer.observe(rail)
    window.addEventListener('scroll', schedule, { passive: true })
    desktop.addEventListener('change', measure)
    measure()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      desktop.removeEventListener('change', measure)
    }
  }, [])

  return (
    <section className="highlights" id="highlights" ref={section} aria-labelledby="highlights-title">
      <div className="wrap section highlights-inner">
        <h2 id="highlights-title">Proud moments</h2>
        <ul className="highlight-track" ref={track} tabIndex={0} aria-label="Career and project highlights">
          {highlights.map((item) => (
            <li key={item.title}>
              <p className="eyebrow">{item.type}</p>
              <strong className="highlight-value">{item.value}</strong>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function DeveloperId() {
  const [flipped, setFlipped] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)
  const lanyard = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; start: number; angle: number } | null>(null)
  const dragged = useRef(false)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return
    dragged.current = false
    cancelAnimationFrame(frame.current)
    lanyard.current?.style.setProperty('--swing', '0deg')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    drag.current = { id: event.pointerId, start: event.clientX, angle: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return
    const distance = event.clientX - drag.current.start
    if (!dragged.current && Math.abs(distance) < 5) return
    dragged.current = true
    drag.current.angle = Math.max(-32, Math.min(32, -distance / 5))
    lanyard.current?.style.setProperty('--swing', `${drag.current.angle}deg`)
  }

  function finishDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return
    const { angle } = drag.current
    drag.current = null
    if (!angle) return
    const start = performance.now()

    function swing(now: number) {
      const elapsed = now - start
      const next = elapsed < 1400 ? angle * Math.cos(elapsed / 92) * Math.exp(-elapsed / 310) : 0
      lanyard.current?.style.setProperty('--swing', `${next}deg`)
      if (elapsed < 1400) frame.current = requestAnimationFrame(swing)
    }

    frame.current = requestAnimationFrame(swing)
  }

  return (
    <div className="id-interaction">
      <div className="lanyard" ref={lanyard}>
        <span className="strap" aria-hidden="true" />
        <button
          className="id-card"
          type="button"
          aria-label="Flip developer ID"
          aria-pressed={flipped}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') setFlipped(true) }}
          onPointerLeave={(event) => { if (event.pointerType === 'mouse') setFlipped(false) }}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onClick={(event) => {
            if (event.detail === 0 || !dragged.current) setFlipped((side) => !side)
          }}
        >
          <span className={`id-inner${flipped ? ' flipped' : ''}`}>
            <span className="id-face" aria-hidden={flipped}>
              <span className="id-label">Developer ID</span>
              <span className="id-photo">
                <img
                  className={`portrait${photoFailed ? ' avatar-crop' : ''}`}
                  src={`${assets}${photoFailed ? 'avatar.png' : 'portrait.jpg'}`}
                  onError={() => setPhotoFailed(true)}
                  draggable={false}
                  alt=""
                  width={116}
                  height={136}
                />
              </span>
              <strong>Abinaya Ramjee</strong>
              <span>AI &amp; Automation</span>
              <small>Drag the card</small>
            </span>
            <span className="id-face id-back" aria-hidden={!flipped}>
              <span className="id-label">Developer ID</span>
              <strong>Computer Science</strong>
              <span>Indiana University Bloomington</span>
              <span>Graduated May 2026</span>
              <small>AI agents · Workflow automation</small>
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

const learning = [
  { title: 'LLM & Agentic AI Engineering', status: 'Technical training' },
  { title: 'Prompt Engineering', status: 'Technical training' },
  { title: 'Salesforce Development', status: 'Technical training' },
  { title: 'AWS Certified Cloud Practitioner', status: 'Certification preparation · In progress' },
  { title: 'Microsoft Fabric DP-700', status: 'Training · In progress' },
]

function ProjectGallery() {
  const [active, setActive] = useState(0)

  return (
    <div className="project-gallery">
      {projects.map((project, index) => {
        const isActive = active === index
        return (
          <article className="gallery-project" data-active={isActive} key={project.title}>
            <h3 className="project-heading">
              <button
                className="project-tab"
                id={`project-tab-${index}`}
                aria-expanded={isActive}
                aria-controls={`project-panel-${index}`}
                type="button"
                onPointerMove={(event) => {
                  if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1050px)').matches) setActive(index)
                }}
                onClick={() => setActive(index)}
              >
                <span>{project.title}</span>
                <span className="project-toggle" aria-hidden="true">{isActive ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              className="gallery-panel"
              id={`project-panel-${index}`}
              role="region"
              aria-labelledby={`project-tab-${index}`}
              hidden={!isActive}
            >
              <div className="gallery-copy">
                <p className="project-summary">{project.summary}</p>
                <p>{project.detail}</p>
                <ul className="project-stack" aria-label="Technologies">
                  {project.stack.split(' · ').map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <figure className="project-demo" data-project={index}>
                <figcaption>Workflow illustration</figcaption>
                <ol>
                  {project.flow.map((step) => <li key={step}><span>{step}</span></li>)}
                </ol>
              </figure>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ProfileLinks() {
  return (
    <div className="profile-links">
      <a href={`${assets}resume.pdf`} target="_blank" rel="noopener">Résumé <span aria-hidden="true">↗</span></a>
      {linkedinUrl && <a href={linkedinUrl}>LinkedIn <span aria-hidden="true">↗</span></a>}
      <a href={githubUrl}>GitHub <span aria-hidden="true">↗</span></a>
    </div>
  )
}

export default function App() {
  const [showVideo, setShowVideo] = useState(false)
  const [videoIndex, setVideoIndex] = useState(0)
  const videoFile = introFiles[videoIndex]
  const [group, setGroup] = useState('All')
  const [selected, setSelected] = useState(skills[0])
  const showAllSkills = group === 'All'

  function selectGroup(next: string) {
    setGroup(next)
    if (next !== 'All' && selected.group !== next) {
      const first = skills.find((skill) => skill.group === next)
      if (first) setSelected(first)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="masthead" id="top">
        <nav className="wrap nav" aria-label="Main navigation">
          <a className="wordmark" href="#top">Abinaya Ramjee</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Work</a>
            <a href="#experience">Experience</a>
            <a href="#learning">Learning</a>
            <a href="#highlights">Highlights</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="name">
          <div className="hero-art">
            {showVideo && videoFile ? (
              <video
                key={videoFile}
                autoPlay
                controls
                playsInline
                width={1280}
                height={720}
                poster={`${assets}avatar.png`}
                src={`${assets}${videoFile}`}
                onError={() => setVideoIndex(videoIndex + 1)}
                aria-label="Abinaya Ramjee’s spoken introduction"
              />
            ) : (
              <>
                <img src={`${assets}avatar.png`} alt="Full-body 3D avatar of Abinaya Ramjee" width={1672} height={941} />
                <span className="hero-lettering" aria-hidden="true">ABINAYA</span>
              </>
            )}
          </div>
          <div className="wrap hero-caption">
            <div>
              <p className="eyebrow" id="name">Abinaya Ramjee</p>
              <h1>AI &amp;<br />Automation</h1>
            </div>
            <div className="hero-actions">
              <button
                className="button"
                type="button"
                onClick={() => {
                  setVideoIndex(0)
                  setShowVideo(!(showVideo && videoFile))
                }}
              >
                {showVideo && videoFile ? 'Close intro' : 'Play intro'}
              </button>
              <a href="#projects">Explore my work ↓</a>
              {showVideo && videoIndex === 1 && <p role="status">Using the original introduction.</p>}
              {showVideo && !videoFile && <p role="status">The introduction video couldn’t load.</p>}
            </div>
          </div>
        </section>

        <section className="band" id="about">
          <div className="wrap section about-grid">
            <div className="about-copy">
              <h2>Hi, I’m <em>Abinaya.</em></h2>
              <p className="about-lead">I build AI tools and like figuring out how they behave when a workflow gets complicated.</p>
              <p>At Level Shift’s AI Center of Excellence, I worked on a multi-agent recruiting prototype across a Python and FastAPI backend and a React and TypeScript frontend. I tested how work moved from feedback review through offer preparation, acceptance, and onboarding. I also investigated API issues and documented the steps that needed follow-up.</p>
              <p>My experience spans React telemetry dashboards with IU Luddy’s Autonomous Racing Team, floorplan image processing for AI research, and business systems work at Indiana FSSA. In my own projects, I’ve built a local research assistant that combines retrieval, semantic memory, and a Streamlit interface.</p>
              <a href="#projects">Explore the projects ↓</a>
            </div>
            <DeveloperId />
            <aside className="about-facts" aria-labelledby="quick-facts">
              <h3 id="quick-facts">Quick facts</h3>
              <dl>
                <div><dt>Focus</dt><dd>Applied AI &amp; automation</dd></div>
                <div><dt>Education</dt><dd>B.S. Computer Science</dd></div>
                <div><dt>University</dt><dd>Indiana University Bloomington</dd></div>
                <div><dt>Graduated</dt><dd>May 2026</dd></div>
                <div><dt>Based in</dt><dd>Indiana</dd></div>
              </dl>
              <ProfileLinks />
            </aside>
          </div>
        </section>

        <section className="wrap section" id="skills">
          <h2>Periodic table of skills</h2>
          <div className="filters" aria-label="Skill categories" role="group">
            {groups.map((name) => (
              <button key={name} type="button" aria-pressed={group === name} onClick={() => selectGroup(name)}>
                {name}
              </button>
            ))}
          </div>
          <div className="skills-layout">
            <ul className="skill-grid">
              {skills.map((skill, index) => (
                <li key={skill.symbol} className={!showAllSkills && skill.group !== group ? 'dimmed' : undefined}>
                  <button
                    className="tile"
                    data-group={skill.group}
                    type="button"
                    aria-pressed={selected.symbol === skill.symbol}
                    onClick={() => setSelected(skill)}
                    onFocus={() => setSelected(skill)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setSelected(skill)
                    }}
                  >
                    <small>{index + 1}</small>
                    <strong>{skill.symbol}</strong>
                    <span>{skill.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <aside className="skill-detail" aria-live="polite">
              <span className="detail-symbol" aria-hidden="true">{selected.symbol}</span>
              <p className="eyebrow">{selected.group}</p>
              <h3>{selected.name}</h3>
              <p className="detail-context">Where I used it</p>
              <p>{selected.note}</p>
            </aside>
          </div>
        </section>

        <section className="band" id="projects">
          <div className="wrap section">
            <h2>Things I’ve <em>built.</em></h2>
            <ProjectGallery />
          </div>
        </section>

        <section className="wrap section" id="experience">
          <h2>Experience &amp; education</h2>
          <ol className="career-path">
            {experience.map((entry) => (
              <li key={entry.role}>
                <p className="career-date">{entry.dates}</p>
                <div className="career-card">
                  <h3>{entry.role}</h3>
                  <p className="career-place">{entry.place}</p>
                  <p>{entry.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="band" id="learning">
          <div className="wrap section learning-index">
            <div>
              <h2>Always <em>learning.</em></h2>
              <p>Technical training and certification preparation in AI, cloud, data, and application development.</p>
            </div>
            <ul className="learning-list">
              {learning.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Highlights />

        <section className="contact" id="contact">
          <div className="wrap section">
            <h2>Let’s connect</h2>
            <ProfileLinks />
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </>
  )
}

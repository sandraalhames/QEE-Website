import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Sponsors from '../components/home/Sponsors';
import q3 from '../content/q3';
import collage from '../assets/q3-collage.jpg';
import styles from './events/EventPage.module.css';
import own from './Q3Initiative.module.css';

const Q3Initiative = () => (
  <>
    <section className={styles.section}>
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="initiative"
          title="Q³ Initiative"
          subtitle="A year-long quantum education initiative uniting science, ethics, and art."
        />
        <div className={own.layout}>
          <div className={own.main}>
            <p className={own.equation}>Q³ = ⟨ Science | Ethics | Art ⟩</p>

        <dl className={own.overview}>
          {q3.overview.map((o) => (
            <div key={o.label}><dt>{o.label}</dt><dd>{o.text}</dd></div>
          ))}
        </dl>

        <div className={own.block}>
          <div className={own.cards}>
            {q3.pillars.map((p) => (
              <div key={p.name} className={own.card}>
                <strong>{p.name}</strong>
                <span>{p.focus}</span>
              </div>
            ))}
          </div>
        </div>

        <figure className={own.photo}>
          <img
            src={collage}
            alt="Qompute 2025: panel discussion, swag table, winning teams on stage, the networking dinner, and organizers announcing winners"
            loading="lazy"
          />
          <figcaption>Moments from Qompute 2025 at USC.</figcaption>
        </figure>

        <div className={own.block}>
          <h2>About the initiative</h2>
          <div className={styles.body}>
            {q3.detail.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>

        <div className={own.block}>
          <h2>How is Q³ year-long?</h2>
          <ol className={own.timeline}>
            {q3.year.map((y) => <li key={y.when}><time>{y.when}</time>{y.what}</li>)}
          </ol>
        </div>

        <div className={own.block}>
          <h2>Qompute 2025 event timeline</h2>
          <div className={own.cards}>
            {q3.timeline.map((t) => (
              <div key={t.title} className={own.card}>
                <strong className={own.small}>{t.title}</strong>
                <span>{t.when}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={own.block}>
          <h2>Initiative scale</h2>
          <div className={own.cards}>
            {q3.stats.map((s) => (
              <div key={s.label} className={own.card}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p className={own.note}>{`Countries reached include ${q3.countries.join(', ')}.`}</p>
        </div>

        <div className={own.block}>
          <h2>What participants gained</h2>
          <p className={own.note}>Self-reported increase in knowledge, from the post-event feedback survey.</p>
          <div className={own.cards} style={{ marginTop: 'var(--space-3)' }}>
            {q3.growth.map((g) => (
              <div key={g.label} className={own.card}>
                <strong>{`+${g.value}`}</strong>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={own.block}>
          <h2>Qompute 2025 speakers</h2>
          <ul className={own.list}>{q3.speakers2025.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
          </div>
          <aside className={own.aside} aria-label="Q³ lab tours recap video">
            <div className={own.sticky}>
              <video
                className={own.video}
                src={`${import.meta.env.BASE_URL}media/q3-lab-tours.mp4`}
                poster={`${import.meta.env.BASE_URL}media/q3-lab-tours-poster.jpg`}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                <track kind="captions" />
              </video>
              <p className={own.caption}>Q³ Hackathon Launch Event and lab tours</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
    <Sponsors />
  </>
);

export default Q3Initiative;

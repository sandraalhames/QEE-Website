import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import Sponsors from '../components/home/Sponsors';
import q3 from '../content/q3';
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
          subtitle="A year-long quantum education initiative uniting science, ethics and art."
        />
        <div className={styles.body}>
          <p>{q3.intro[0]}</p>
          <p className={own.equation}>Q³ = ⟨ Science | Ethics | Art ⟩</p>
          <p>{q3.intro[1]}</p>
        </div>

        <div className={own.block}>
          <h2>Two flagship events</h2>
          <div className={own.cards}>
            {q3.pillars.map((p) => (
              <div key={p.name} className={own.card}>
                <strong>{p.name}</strong>
                <span>{`${p.where} · ${p.focus}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={own.block}>
          <h2>A year of quantum</h2>
          <ol className={own.timeline}>
            {q3.year.map((y) => (
              <li key={y.when}><time>{y.when}</time>{y.what}</li>
            ))}
          </ol>
        </div>

        <div className={own.block}>
          <h2>Qompute 2025</h2>
          <div className={styles.body}>
            {q3.qompute.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className={own.cards} style={{ marginTop: 'var(--space-3)' }}>
            {q3.stats.map((s) => (
              <div key={s.label} className={own.card}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={own.block}>
          <h2>2025 speakers</h2>
          <ul className={own.list}>{q3.speakers2025.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>

        <div className={own.block}>
          <h2>2025 partners</h2>
          <ul className={own.list}>{q3.partners2025.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
      </Container>
    </section>
    <Sponsors />
  </>
);

export default Q3Initiative;

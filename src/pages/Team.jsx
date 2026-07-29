import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import TeamCard from '../components/team/TeamCard';
import team from '../content/team';
import styles from './Team.module.css';

const Team = () => (
  <section className={styles.section}>
    <Container>
      <SectionHeading
        as="h1"
        eyebrow="team"
        title="Meet the e-board"
        subtitle="The USC students behind QEE and Qompute in LA."
      />
      <div className={styles.grid}>
        {team.map((member, index) => (
          <TeamCard
            // eslint-disable-next-line react/no-array-index-key
            key={member.name || `${member.role}-${index}`}
            name={member.name}
            role={member.role}
            photo={member.photo}
            linkedin={member.linkedin}
          />
        ))}
      </div>
    </Container>
  </section>
);

export default Team;

import React from 'react';

const Home: React.FC = () => {
  return (
    <main>
      <div className="landing" id="Home">
        <div className="landing-image">
          <img src="/logo512.png" alt="Cyber Ranger" />
        </div>
        <div className="landing-description">
          <h1 className="title">Codename : APEX</h1>
          <p>
          Codename: APEX (Application Penetration and Security Testing X) adalah sebuah aplikasi inovatif hasil dari Project Based Learning 
          mahasiswa Politeknik Negeri Batam. Aplikasi ini dirancang untuk membantu proses pengujian keamanan dan penetrasi aplikasi secara efisien, 
          dengan fitur yang mendukung kebutuhan keamanan siber modern.
          </p>
          <button>Lebih lanjut</button>
        </div>
      </div>
      <div className="content">
        <article className="card" id="Tentang">
          <h2>Tentang Kami</h2>
          <p>
          Kami adalah sekelompok mahasiswa Politeknik Negeri Batam yang berkomitmen untuk menciptakan solusi inovatif di bidang keamanan perangkat lunak.
          Tim kami terdiri dari berbagai individu dengan latar belakang dan keahlian berbeda, bekerja sama dalam Project Based Learning untuk mengembangkan
          Codename: APEX (Application Penetration and Security Testing X).
          </p>
          <p>
          Beranggotakan mahasiswa jurusan Keamanan Pengembangan Perangkat Lunak, tim ini dipimpin oleh Yogi Rahman Alif sebagai Ketua Tim, bersama anggota
          lainnya: Joenery Pratama, Fathur Wiriansyah, M. Hafiz Pratama, RM. Sultan Arif, dan Putri Syajah. Dengan bimbingan dari Manajer Proyek, Nelmiawati,
          B.CS., M.Comp.Sc., kami berusaha menghadirkan aplikasi yang mempermudah pengujian keamanan aplikasi secara dinamis.
          </p>
          <p>
          Codename: APEX lahir untuk menghadirkan solusi tools open source yang sederhana namun kuat, mampu melakukan crawling, attacking, hingga reporting
          dengan berbagai simulasi serangan, seperti Path Traversal, XSS, SQL Injection, dan lainnya. Kami berharap solusi ini dapat diakses oleh startup dan
          organisasi kecil yang membutuhkan tools keamanan berkualitas tanpa biaya mahal. Dengan mengedepankan semangat kolaborasi dan inovasi, kami percaya 
          bahwa Codename: APEX dapat memberikan kontribusi nyata dalam meningkatkan keamanan aplikasi di berbagai sektor.
          </p>          
        </article>
      </div>
      <div className="team-section" id="Team">
        <h2 className="team-title">Tim Kami</h2>
        <div className="team-cards">
        <div className="team-card">
            <img src="/images/Joe.jpg" alt="Joenery Pratama" />
            <h3>Joenery Pratama</h3>
            <p>4332201008</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
          <div className="team-card">
            <img src="/images/Yogi.jpg" alt="Yogi Rahman Alif" />
            <h3>Yogi Rahman Alif</h3>
            <p>4332201012</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
          <div className="team-card">
            <img src="/images/Fathur.png" alt="Fathur Wiriansyah" />
            <h3>Fathur Wiriansyah</h3>
            <p>4332201023</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
          <div className="team-card">
            <img src="/images/Hafiz.png" alt="M. Hafiz Pratama" />
            <h3>M. Hafiz Pratama</h3>
            <p>4332201026</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
          <div className="team-card">
            <img src="/images/Putri.png" alt="Putri Syajah" />
            <h3>Putri Syajah</h3>
            <p>4332201066</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
          <div className="team-card">
            <img src="/images/Sultan.jpg" alt="RM. Sultan Arif" />
            <h3>RM. Sultan Arif</h3>
            <p>4332201024</p>
            <p>Mahasiswa Rekayasa Keamanan Siber</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

const HeightVary = ({ scrollY, height, section, text, onClick }) => {
  const active = scrollY > (section - 1.5) * height && scrollY < (section - 0.5) * height;

  const style = active
    ? { border: '3px solid rgba(255, 255, 255, 0.18)', cursor: 'pointer', height: '48px', background: 'rgba(255, 255, 255, 0.356)' }
    : { cursor: 'pointer', height: '48%' };

  return (
    <div className="GlassCard" style={style} onClick={onClick}>
      {text}
    </div>
  );
};

export default HeightVary;

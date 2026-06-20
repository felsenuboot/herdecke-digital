/**
 * A small vertical stack of flags: European Union, Germany, the federal state
 * and the city. EU + Germany are national constants; the state and city flags
 * come from the city config (drawn as inline SVG civil flags — sharp at any
 * size, no assets, deliberately NOT a coat of arms / protected emblem).
 */
import { city } from '@/config/city';

const STAR =
  'M0,-1 L-0.225,-0.309 L-0.951,-0.309 L-0.363,0.118 L-0.588,0.809 L0,0.382 L0.588,0.809 L0.363,0.118 L0.951,-0.309 L0.225,-0.309 Z';

const STAR_POS: [number, number][] = [
  [18, 5], [21.5, 5.9], [24.1, 8.5], [25, 12], [24.1, 15.5], [21.5, 18.1],
  [18, 19], [14.5, 18.1], [11.9, 15.5], [11, 12], [11.9, 8.5], [14.5, 5.9],
];

/** Equal horizontal stripes as an inline SVG (civil-flag colours). */
export function StripeFlag({ stripes, className, label }: { stripes: string[]; className?: string; label?: string }) {
  const h = 24 / stripes.length;
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {label ? <title>{label}</title> : null}
      {stripes.map((color, i) => (
        <rect key={i} width="36" height={h} y={i * h} fill={color} />
      ))}
    </svg>
  );
}

function EuFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" role="img" aria-label="Europäische Union">
      <title>Europäische Union</title>
      <rect width="36" height="24" fill="#003399" />
      <defs>
        <path id="hd-star" d={STAR} fill="#FFCC00" />
      </defs>
      {STAR_POS.map(([x, y], i) => (
        <use key={i} href="#hd-star" transform={`translate(${x} ${y}) scale(1.25)`} />
      ))}
    </svg>
  );
}

/** Germany (national constant). */
const GERMANY_STRIPES = ['#000000', '#DD0000', '#FFCE00'];

export function FlagStack({ className }: { className?: string } = {}) {
  return (
    <div className={className ? `flag-stack ${className}` : 'flag-stack'}>
      <EuFlag className="flag" />
      <StripeFlag className="flag" stripes={GERMANY_STRIPES} label="Deutschland" />
      <StripeFlag className="flag" stripes={city.state.stripes} label={city.state.name} />
      <StripeFlag className="flag" stripes={city.flag.stripes} label={city.name} />
    </div>
  );
}

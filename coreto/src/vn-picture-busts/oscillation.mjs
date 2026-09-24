export function vnOscillation(frame, speed, rate) {
    return Math.cos(frame / (speed || 0.01)) * rate;
}
export function vnFidgetY(frame, speed, rate) {
    return vnOscillation(frame, speed, rate / 2) + rate / 2;
}

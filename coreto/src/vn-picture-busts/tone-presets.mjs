export function vnPresetTone(name) {
    switch (name.toUpperCase().trim()) {
        case 'DARK': return [-68, -68, -68, 0];
        case 'SEPIA': return [34, -34, -68, 170];
        case 'SUNSET': return [68, -34, -34, 0];
        case 'NIGHT': return [-68, -68, 0, 68];
        default: return [0, 0, 0, 0];
    }
}

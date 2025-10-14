<script lang="ts" module>
  type Letter =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";

  // [LEFT POSITION, RIGHT POSITION, FLIP LEFT, FLIP RIGHT]
  // positions measured anticlockwise and clockwise from up for left and right respectively in 45 degree increments, from 0-4
  // flips default to false
  const FLAGS: Readonly<
    Record<Letter, Readonly<[number, number, boolean?, boolean?]>>
  > = {
    A: [3, 4],
    B: [2, 4],
    C: [1, 4],
    D: [0, 4],
    E: [4, 1],
    F: [4, 2],
    G: [4, 3],
    H: [2, 3, false, true],
    I: [1, 3, false, true],
    J: [0, 2],
    K: [3, 0],
    L: [3, 1],
    M: [3, 2],
    N: [3, 3],
    O: [2, 1, false, true],
    P: [2, 0],
    Q: [2, 1],
    R: [2, 2],
    S: [2, 3],
    T: [1, 0],
    U: [1, 1],
    V: [0, 3],
    W: [1, 2, true, false],
    X: [1, 3, true, false],
    Y: [1, 2],
    Z: [3, 2, true, false],
  };

  export type { Letter };
</script>

<script lang="ts">
  type Props = {
    flag: Letter;
  };

  let { flag }: Props = $props();
  let orientations = $derived(FLAGS[flag] ?? FLAGS.A);

  // the flipped arms are already rotated 45 deg and rotate in the opposite direction
  let leftAngle = $derived(
    !orientations[2] ? orientations[0] * -45 : (orientations[0] - 1) * 45
  );
  let rightAngle = $derived(
    !orientations[3] ? orientations[1] * 45 : (orientations[1] - 1) * -45
  );
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.0"
  viewBox="0 0 600 500"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <circle cx="300" cy="210" r="25" />
  <rect width="70" height="160" x="265" y="240" rx="20" ry="20" />

  <!-- left -->
  <g transform="rotate({leftAngle} 250 250)" class:hidden={orientations[2]}>
    <rect rx="10" ry="10" x="240" y="190" height="70" width="20" />
    <path stroke="#000" d="M245 200V0h10v200z" />
    <path d="M155 90V0h90v90z" fill="#ff0" />
    <path d="M155 0h90v90z" fill="red" />
    <path d="M155 90V0h90v90z" fill="none" stroke="#000" />
  </g>

  <!-- right -->
  <g transform="rotate({rightAngle} 350 250)" class:hidden={orientations[3]}>
    <rect width="20" height="70" x="340" y="190" rx="10" ry="10" />
    <path stroke="#000" d="M345 200V0h10v200z" />
    <path d="M445 90h-90V0h90z" fill="#ff0" />
    <path d="M355 90V0h90z" fill="red" />
    <path d="M445 90h-90V0h90z" fill="none" stroke="#000" />
  </g>

  <!-- left, flipped -->
  <g transform="rotate({leftAngle} 280 250)" class:hidden={!orientations[2]}>
    <rect
      transform="rotate(-45)"
      width="70"
      height="20"
      x="12.6"
      y="366.2"
      rx="10"
      ry="10"
    />
    <path stroke="#000" d="M313.8 211.1 455.2 69.7l7.1 7L321 218.3z" />
    <path d="m462.3 204-63.6-63.6 63.6-63.6 63.7 63.6z" fill="#ff0" />
    <path d="m398.7 140.4 63.6-63.6 63.7 63.6z" fill="red" />
    <path
      d="m462.3 204-63.6-63.6 63.6-63.6 63.7 63.6z"
      fill="none"
      stroke="#000"
    />
  </g>

  <!-- right, flipped -->
  <g transform="rotate({rightAngle} 320 250)" class:hidden={!orientations[3]}>
    <rect
      transform="rotate(-135)"
      ry="10"
      rx="10"
      y="38.1"
      x="-411.6"
      height="20"
      width="70"
    />
    <path stroke="#000" d="M279.1 218.1 137.7 76.7l7-7L286.2 211z" />
    <path d="M137.7 204 74 140.4l63.7-63.6 63.6 63.6z" fill="#ff0" />
    <path d="m74 140.4 63.7-63.6 63.6 63.6z" fill="red" />
    <path
      d="M137.7 204 74 140.4l63.7-63.6 63.6 63.6z"
      fill="none"
      stroke="#000"
    />
  </g>
</svg>

<style lang="scss">
  .hidden {
    display: none;
  }
</style>

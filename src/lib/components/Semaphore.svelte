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

  export type { Letter };
</script>

<script lang="ts">
  type Props = {
    flag: Letter;
  };

  let { flag }: Props = $props();
</script>

<img src="flags/Semaphore_{flag}.svg" alt={flag} />

<!-- <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.0"
  viewBox="0 0 600 500"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <circle cx="300" cy="210" r="25" />
  <rect width="70" height="160" x="265" y="240" rx="20" ry="20" />

  <g id="left" transform="rotate(0 250 250)">
    <rect rx="10" ry="10" x="240" y="190" height="70" width="20" />
    <path stroke="#000" d="M245 200V0h10v200z" />
    <path d="M155 90V0h90v90z" fill="#ff0" />
    <path d="M155 0h90v90z" fill="red" />
    <path d="M155 90V0h90v90z" fill="none" stroke="#000" />
  </g>

  <g id="right" transform="rotate(90 350 250)">
    <rect width="20" height="70" x="340" y="190" rx="10" ry="10" />
    <path stroke="#000" d="M345 200V0h10v200z" />
    <path d="M445 90h-90V0h90z" fill="#ff0" />
    <path d="M355 90V0h90z" fill="red" />
    <path d="M445 90h-90V0h90z" fill="none" stroke="#000" />
  </g>

  <g id="left-flip" transform="rotate(0 280 250)">
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

  <g id="right-flip">
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
</svg> -->

<style lang="scss">
  img {
    width: 100%;
    height: 100%;

    aspect-ratio: 1;
  }
</style>

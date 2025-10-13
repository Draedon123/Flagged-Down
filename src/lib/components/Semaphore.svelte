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

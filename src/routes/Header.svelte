<script>
  import { formatedTime, formatedDate } from "../store/date";
</script>

<header>
  <time datetime={$formatedDate}>{$formatedDate}</time>
  <time datetime={$formatedTime}>{$formatedTime}</time>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 16px;
    background-color: var(--color-header);
    padding: 10px 15px;
    box-sizing: border-box;
  }
</style>

<template>
  <table class="container table table-bordered table-striped my-0">
    <thead>
      <tr>
        <th class="p-3">
          <div class="d-flex">
            <svg
              class="me-2"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </svg>
            <slot></slot>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>

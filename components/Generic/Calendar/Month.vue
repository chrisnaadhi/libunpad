<template>
  <section class="calendar-month">
    <div class="calendar-month-header">
      <!-- Month Name -->
      <CalendarDateIndicator />
      <!-- Pagination -->
      <CalendarDateSelector />
    </div>

    <!-- Calendar Weekdays -->
    <CalendarWeekdays />

    <!-- Calendar Grid -->
    <ol class="days-grid">
      <CalendarMonthDayItem />
    </ol>
  </section>
</template>

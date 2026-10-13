// Operational dashboard only. Never accept or render student names, task titles, prompts or chat histories.
const count = (value) => Number.isSafeInteger(value) && value >= 0 ? value : 0;
const metric = (title,value,detail) =>
  `<article class="card" aria-label="${title}"><div class="eyebrow">${title}</div><div class="metric">${count(value)}</div><p class="notice">${detail}</p></article>`;

export function renderAdminOverview(data) {
  if (!data || typeof data !== 'object') throw Error('Operational summary unavailable');
  const stage = data.environment === 'preview' ? 'Staging environment' : 'Restricted environment';
  const remaining = Math.max(0, count(data.totalTasks) - count(data.completedTasks));
  return `
    <div class="row between" style="margin:18px 0 10px">
      <div><strong>${stage}</strong><p class="notice">Operational totals only. No private student data, conversations or task titles.</p></div>
      <span class="chip">Saathi v0.1 · Qualification in progress</span>
    </div>
    <div class="grid">
      ${metric('Students',data.students,'Registered learner accounts')}
      ${metric('Parents',data.parents,'Guardian accounts')}
      ${metric('Administrators',data.admins,'Operational roles only')}
      ${metric('Study tasks',data.totalTasks,'${remaining} incomplete; ${count(data.completedTasks)} completed')}
      ${metric('Linked parent accounts',data.linkedParents,'Verified learner associations')}
      ${metric('Boards configured',data.configuredBoards,'Students with a board selected')}
      ${metric('AI attempts today',data.aiAttemptsToday,'Aggregate requests (UTC), not prompts')}
    </div>
    <section class="card" style="margin-top:22px">
      <h2>Administration safeguards</h2>
      <p class="muted">The admin role cannot read learner study tasks, chat histories or personal notes. Parents can only view aggregated progress for their linked learner.</p>
      <p class="notice">This dashboard does not manage credentials or publish releases. Production eligibility, safeguarding and curriculum accuracy require separate acceptance.</p>
    </section>`;
}

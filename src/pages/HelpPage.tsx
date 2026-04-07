import { useTranslation } from 'react-i18next'

interface Entry {
  titleKey: string
  bodyKey: string
}

interface Section {
  headingKey: string
  entries: Entry[]
}

const SECTIONS: Section[] = [
  {
    headingKey: 'help.sections.metrics',
    entries: [
      { titleKey: 'help.titles.cycleTime',     bodyKey: 'help.cycleTime' },
      { titleKey: 'help.titles.leadTime',       bodyKey: 'help.leadTime' },
      { titleKey: 'help.titles.throughput',     bodyKey: 'help.throughput' },
      { titleKey: 'help.titles.analyzed',       bodyKey: 'help.analyzed' },
      { titleKey: 'help.titles.rework',          bodyKey: 'help.rework' },
      { titleKey: 'help.titles.reworkPaths',    bodyKey: 'help.reworkPaths' },
      { titleKey: 'help.titles.flowEfficiency', bodyKey: 'help.flowEfficiency' },
    ],
  },
  {
    headingKey: 'help.sections.charts',
    entries: [
      { titleKey: 'help.titles.cycleTimeTrend',   bodyKey: 'help.cycleTimeTrend' },
      { titleKey: 'help.titles.leadTimeTrend',     bodyKey: 'help.leadTimeTrend' },
      { titleKey: 'help.titles.weeklyThroughput',  bodyKey: 'help.weeklyThroughput' },
      { titleKey: 'help.titles.cfd',               bodyKey: 'help.cfd' },
      { titleKey: 'help.titles.boardVisualization',bodyKey: 'help.boardVisualization' },
      { titleKey: 'help.titles.cycleTimeByType',   bodyKey: 'help.cycleTimeByType' },
      { titleKey: 'help.titles.timeRange',         bodyKey: 'help.timeRange' },
    ],
  },
  {
    headingKey: 'help.sections.forecasting',
    entries: [
      { titleKey: 'help.titles.perTicketBreakdown', bodyKey: 'help.perTicketBreakdown' },
    ],
  },
  {
    headingKey: 'help.sections.tickets',
    entries: [
      { titleKey: 'help.titles.ticketColors',   bodyKey: 'help.ticketColors' },
      { titleKey: 'help.titles.analyzedOnly',   bodyKey: 'help.analyzedOnly' },
      { titleKey: 'help.titles.ticketTimeline', bodyKey: 'help.ticketTimeline' },
    ],
  },
  {
    headingKey: 'help.sections.configuration',
    entries: [
      { titleKey: 'help.titles.configMode',       bodyKey: 'help.configMode' },
      { titleKey: 'help.titles.modeFirstLast',    bodyKey: 'help.modeFirstLast' },
      { titleKey: 'help.titles.modeFirstFirst',   bodyKey: 'help.modeFirstFirst' },
      { titleKey: 'help.titles.modeLastLast',     bodyKey: 'help.modeLastLast' },
      { titleKey: 'help.titles.cycleTimeConfig',  bodyKey: 'help.cycleTimeConfig' },
      { titleKey: 'help.titles.leadTimeConfig',   bodyKey: 'help.leadTimeConfig' },
      { titleKey: 'help.titles.cycleStartStatus', bodyKey: 'help.cycleStartStatus' },
      { titleKey: 'help.titles.cycleEndStatus',   bodyKey: 'help.cycleEndStatus' },
      { titleKey: 'help.titles.leadStartStatus',  bodyKey: 'help.leadStartStatus' },
      { titleKey: 'help.titles.leadEndStatus',    bodyKey: 'help.leadEndStatus' },
      { titleKey: 'help.titles.statusOrder',       bodyKey: 'help.statusOrder' },
      { titleKey: 'help.titles.activeStatuses',   bodyKey: 'help.activeStatuses' },
      { titleKey: 'help.titles.configContext',    bodyKey: 'help.configContext' },
      { titleKey: 'help.titles.boardColors',      bodyKey: 'help.boardColors' },
    ],
  },
  {
    headingKey: 'help.sections.import',
    entries: [
      { titleKey: 'help.titles.projectKey',        bodyKey: 'help.projectKey' },
      { titleKey: 'help.titles.issueTypes',        bodyKey: 'help.issueTypes' },
      { titleKey: 'help.titles.maxTickets',        bodyKey: 'help.maxTickets' },
      { titleKey: 'help.titles.completedBetween',  bodyKey: 'help.completedBetween' },
      { titleKey: 'help.titles.datasetName',       bodyKey: 'help.datasetName' },
      { titleKey: 'help.titles.datasetConfig',     bodyKey: 'help.datasetConfig' },
      { titleKey: 'help.titles.connName',          bodyKey: 'help.connName' },
      { titleKey: 'help.titles.connBaseUrl',       bodyKey: 'help.connBaseUrl' },
      { titleKey: 'help.titles.connEmail',         bodyKey: 'help.connEmail' },
      { titleKey: 'help.titles.connApiToken',      bodyKey: 'help.connApiToken' },
      { titleKey: 'help.titles.configName',        bodyKey: 'help.configName' },
      { titleKey: 'help.titles.configBaseUrl',     bodyKey: 'help.configBaseUrl' },
    ],
  },
  {
    headingKey: 'help.sections.ai',
    entries: [
      { titleKey: 'help.titles.llmProvider',     bodyKey: 'help.llmProvider' },
      { titleKey: 'help.titles.llmBaseUrl',      bodyKey: 'help.llmBaseUrl' },
      { titleKey: 'help.titles.llmSystemPrompt', bodyKey: 'help.llmSystemPrompt' },
    ],
  },
]

export default function HelpPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('nav.help')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">{t('help.subtitle')}</p>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.headingKey}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            {t(section.headingKey)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.entries.map((entry) => (
              <div
                key={entry.bodyKey}
                className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 hover:border-gray-200 hover:bg-white transition-colors"
              >
                <p className="text-sm font-semibold text-gray-800 mb-1">{t(entry.titleKey)}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{t(entry.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

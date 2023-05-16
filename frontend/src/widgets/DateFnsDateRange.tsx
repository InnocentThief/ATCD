import classNames from 'classnames'
import { format, isValid } from 'date-fns'
import * as React from 'react'

import { Intent, Props, Tag } from '@blueprintjs/core'
import { DateRange } from '@blueprintjs/datetime'

const FORMAT = 'EEEE, MMMM d, yyyy'

export const DateFnsDate: React.FC<{
  date: Date
  formatStr?: string
}> = ({ date, formatStr = FORMAT }) => {
  if (isValid(date)) {
    return <Tag intent={Intent.PRIMARY}>{format(date, formatStr)}</Tag>
  } else {
    return <Tag minimal={true}>no date</Tag>
  }
}

export const DateFnsDateRange: React.FC<
  { range: DateRange; formatStr?: string } & Props
> = ({ className, range: [start, end], formatStr = FORMAT }) => (
  <div className={classNames('docs-date-range', className)}>
    {/* <DateFnsDate date={start} formatStr={formatStr} />
            <Icon icon="arrow-right" />
            <DateFnsDate date={end} formatStr={formatStr} /> */}
  </div>
)

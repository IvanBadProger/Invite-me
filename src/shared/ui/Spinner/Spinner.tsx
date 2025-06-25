import clsx from "clsx"
import styles from "./Spinner.module.scss"

type SpinnerProps = { className?: string }

export const Spinner = (props: SpinnerProps) => {
  const { className } = props

  return <div className={clsx(styles.spinner, className)} />
}

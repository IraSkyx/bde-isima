import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import MuiCard from "@material-ui/core/Card"
import Skeleton from "@material-ui/lab/Skeleton"
import ListItem from "@material-ui/core/ListItem"
import IconButton from "@material-ui/core/IconButton"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import DotsVertical from "mdi-material-ui/DotsVertical"

import { User } from "db"
import { EventSubscriptionWithTypedCart, Option } from "types"

type CardProps = {
  subscription: EventSubscriptionWithTypedCart & { user: User }
  isFetching: boolean
  onMenuClick: (target, subscription) => void
}

export default function Card({ subscription, isFetching, onMenuClick }: CardProps) {
  const onPopupMenu = (event) => {
    onMenuClick(event.currentTarget, subscription)
  }

  return (
    <Grid container item justifyContent="center" xs={12} md={4}>
      <MuiCard className="w-full h-full flex flex-col">
        <CardHeader
          className="items-start"
          classes={{ content: "flex flex-col" }}
          title={
            isFetching ? (
              <Skeleton className="mb-4" animation="wave" height={10} width="80%" />
            ) : (
              `${subscription.user.firstname} ${subscription.user.lastname}`
            )
          }
          titleTypographyProps={{ variant: "subtitle2" }}
          subheader={
            isFetching ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              `Paiement par ${subscription.payment_method}`
            )
          }
          subheaderTypographyProps={{ variant: "caption" }}
          action={
            !isFetching && (
              <IconButton aria-label="Options" onClick={onPopupMenu}>
                <DotsVertical />
              </IconButton>
            )
          }
        />

        {isFetching ? (
          <Skeleton className="h-20" animation="wave" variant="rectangular" />
        ) : (
          <List>
            {subscription.cart.map((cartItem, idx) => {
              const price =
                cartItem.quantity *
                (cartItem.price +
                  cartItem.options.reduce((acc: number, o: Option) => acc + o.price, 0))
              return (
                <ListItem key={idx} dense>
                  <ListItemIcon>
                    <Typography variant="overline">x{cartItem.quantity}</Typography>
                  </ListItemIcon>

                  <ListItemText
                    primary={cartItem.name}
                    secondary={cartItem.options.map((x) => x.name).join(", ")}
                  />

                  <ListItemSecondaryAction>
                    <ListItemText primary={`${price} €`} />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        )}
      </MuiCard>
    </Grid>
  )
}

import Button from "@material-ui/core/Button";
import { withStyles, WithStyles, StyleRules } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import * as React from "react";

interface OwnProps {
    label: string;
}

    const style: StyleRules = {
        root: {
            fontWeight: 700,
        },
    };
const styles: StyleRules = {
        button: {
            margin: '0',
            textAlign: "center"
        },
};

type MyButtonProps = OwnProps & WithStyles<typeof styles>;

const MyButton: React.SFC<MyButtonProps> = ({ label, classes }) => {
    return (
        <Button color="primary" className={classes.button}>
            {label}
        </Button>
    );
};

export default withStyles(styles)(MyButton);

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Typography,
} from "@material-ui/core";

interface Props {
  loading: boolean;
  createComment: (text: string) => void;
}

const PostCommentWriter = ({ createComment, loading }: Props) => {
  const [commentText, setCommentText] = useState("");

  return (
    <Card className="w-100 mb-2">
      <CardContent>
        <form
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            if (commentText) {
              createComment(commentText);
              setCommentText("");
            }
          }}
        >
          <div className="container-fluid align-items-center">
            <div className="row mb-1">
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Írj egy tippet/kommentet..."
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
            <div className="row align-items-center">
              {loading ? (
                <CircularProgress className="mt-2" />
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    *A tipp helyességét a poszt létrehozója jelölheti zöld vagy
                    piros háromszöggel.
                  </Typography>
                  <button
                    className="button-primary mt-2 ml-auto"
                    disabled={!commentText}
                    type="submit"
                  >
                    Küldés
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostCommentWriter;

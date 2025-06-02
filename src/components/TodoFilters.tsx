import React from "react";
import { Button, ButtonGroup } from "@mui/material";

type Filter = "all" | "active" | "completed";

interface TodoFiltersProps {
  currentFilter: Filter;
  onChange: (filter: Filter) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onChange,
}) => {
  return (
    <ButtonGroup variant="outlined" fullWidth>
      <Button
        variant={currentFilter === "all" ? "contained" : "outlined"}
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <Button
        variant={currentFilter === "active" ? "contained" : "outlined"}
        onClick={() => onChange("active")}
      >
        Active
      </Button>
      <Button
        variant={currentFilter === "completed" ? "contained" : "outlined"}
        onClick={() => onChange("completed")}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
};

export default TodoFilters;
export type { Filter };

import React from "react";
import "./FilterModal.css";

const FilterModal = ({
    filters,
    setFilters,
    onClose,
    onApply,
    tasks,
    onreset,
}) => {

    const uniqueAssignees = [...new Set(tasks.map(t => t.assignedTo))];

   
    return (
        <div className="filter-overlay">
            <div className="filter-modal">

                <h3>Filter Tasks</h3>

                {/* STATUS */}
                <div className="filter-group">
                    <label>Status</label>
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                        }
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* ASSIGNEE */}
                <div className="filter-group">
                    <label>Assignee</label>
                    <select
                        value={filters.assignee}
                        onChange={(e) =>
                            setFilters({ ...filters, assignee: e.target.value })
                        }
                    >
                        <option value="all">All</option>
                        {uniqueAssignees.map(email => (
                            <option key={email} value={email}>
                                {email}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATE */}
                <div className="filter-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                            setFilters({ ...filters, date: e.target.value })
                        }
                    />
                </div>

                <div className="filter-actions">
                    <button className="reset-btn"
                        onClick={onreset}>
                        Reset
                    </button>

                    <button className="apply-btn" onClick={onApply}>
                        Apply
                    </button>

                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FilterModal;

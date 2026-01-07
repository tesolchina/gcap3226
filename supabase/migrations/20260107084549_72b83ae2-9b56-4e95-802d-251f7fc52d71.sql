-- Update the create_default_milestones function to include Week 8 milestone
CREATE OR REPLACE FUNCTION public.create_default_milestones(p_project_group_id uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  INSERT INTO project_milestones (project_group_id, title, description, display_order, is_custom)
  VALUES
    (p_project_group_id, 'Confirm Group Membership', 'All group members confirmed and registered by Week 3', 1, false),
    (p_project_group_id, 'Data Collection Plan Submitted', 'Submit empirical data collection plan by Week 5', 2, false),
    (p_project_group_id, 'Fieldwork Conducted', 'Complete field research activities during Week 6', 3, false),
    (p_project_group_id, 'Empirical Data Collection Complete', 'Complete all empirical data collection through fieldwork by Week 8', 4, false),
    (p_project_group_id, 'Draft Report Outline', 'Submit draft outline by Week 9', 5, false),
    (p_project_group_id, 'Presentation 1 Complete', 'Deliver first in-class presentation in Week 11', 6, false),
    (p_project_group_id, 'Final Report Submitted', 'Submit final project report and poster by Week 13', 7, false);
END;
$$;
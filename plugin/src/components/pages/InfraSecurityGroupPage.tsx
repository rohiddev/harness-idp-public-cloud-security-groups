import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  ACCOUNTS,
  REGIONS,
  SECURITY_GROUPS,
  SecurityGroup,
  SecurityGroupRule,
} from '../../data/services';

// ── Styles ────────────────────────────────────────────────────────────────────
const useStyles = makeStyles(theme => ({
  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: theme.spacing(0.5),
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: theme.spacing(3),
  },

  // ── Page 1 ────────────────────────────────────────────────────────────
  formHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(3),
  },
  contactBtn: {
    backgroundColor: '#00965E',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.06em',
    padding: theme.spacing(1, 2),
    '&:hover': { backgroundColor: '#007A4D' },
  },
  formField: {
    marginBottom: theme.spacing(3),
  },
  validationText: {
    color: '#c62828',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 600,
  },
  continueBtn: {
    backgroundColor: '#00965E',
    color: '#fff',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.07em',
    padding: theme.spacing(1.25, 5),
    marginTop: theme.spacing(1),
    '&:hover': { backgroundColor: '#007A4D' },
  },

  // ── Page 2 ────────────────────────────────────────────────────────────
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
  },
  searchBox: {
    flex: 1,
    minWidth: 260,
    maxWidth: 500,
  },
  actionsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    marginLeft: 'auto',
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  actionGroupLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  submitBtn: {
    backgroundColor: '#00965E',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: '0.06em',
    padding: theme.spacing(1, 2.5),
    '&:hover': { backgroundColor: '#007A4D' },
  },
  csvGroup: { display: 'flex' },
  csvAll: {
    backgroundColor: '#c62828',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    padding: theme.spacing(1, 2),
    borderRadius: '4px 0 0 4px',
    '&:hover': { backgroundColor: '#b71c1c' },
  },
  csvUpdates: {
    backgroundColor: '#7f0000',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    padding: theme.spacing(1, 2),
    borderRadius: '0 4px 4px 0',
    '&:hover': { backgroundColor: '#6a0000' },
  },
  docsLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 13,
    color: '#555',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': { color: '#00965E' },
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  controlBtn: {
    fontSize: 12,
    color: '#444',
    border: '1px solid #ccc',
    padding: theme.spacing(0.5, 1.5),
    '&:hover': { backgroundColor: '#f5f5f5' },
  },
  contextChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  contextChip: {
    fontSize: 12,
    height: 26,
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    border: '1px solid #a5d6a7',
  },

  // Security group card
  sgCard: {
    border: '1px solid #e0e0e0',
    borderRadius: 6,
    marginBottom: theme.spacing(1.5),
    overflow: 'hidden',
  },
  sgHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    backgroundColor: '#fafafa',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': { backgroundColor: '#f0f0f0' },
  },
  sgHeaderLeft: { display: 'flex', flexDirection: 'column' },
  sgName: { fontSize: 15, fontWeight: 600, color: '#1a1a1a' },
  sgMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  sgHeaderRight: { display: 'flex', alignItems: 'center', gap: theme.spacing(1.5) },
  addRuleBtn: {
    backgroundColor: '#00965E',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    padding: theme.spacing(0.75, 2),
    '&:hover': { backgroundColor: '#007A4D' },
  },
  chevron: { color: '#666', fontSize: 20, transition: 'transform 0.2s' },
  chevronOpen: { transform: 'rotate(180deg)' },

  // Rules table
  rulesWrap: {
    padding: theme.spacing(2),
    borderTop: '1px solid #e0e0e0',
  },
  rulesLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: theme.spacing(1),
  },
  thCell: { fontSize: 12, fontWeight: 700, color: '#444', padding: theme.spacing(1, 1.5) },
  tdCell: { fontSize: 13, color: '#333', padding: theme.spacing(0.75, 1.5) },
  dirChip: { fontSize: 10, fontWeight: 700, height: 20, borderRadius: 4 },
  inbound: { backgroundColor: '#e3f2fd', color: '#1565c0' },
  outbound: { backgroundColor: '#fce4ec', color: '#c62828' },
  noRules: { fontSize: 13, color: '#999', fontStyle: 'italic', padding: theme.spacing(1) },

  // Add rule inline form
  addRuleForm: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f9f9f9',
    border: '1px dashed #ccc',
    borderRadius: 6,
  },
  addRuleTitle: { fontSize: 13, fontWeight: 700, color: '#333', marginBottom: theme.spacing(2) },
  formRow: { display: 'flex', gap: theme.spacing(1.5), flexWrap: 'wrap', marginBottom: theme.spacing(1.5) },
  formRowField: { flex: 1, minWidth: 140 },
  formActions: { display: 'flex', gap: theme.spacing(1), justifyContent: 'flex-end', marginTop: theme.spacing(1) },
  saveBtn: {
    backgroundColor: '#00965E',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
    '&:hover': { backgroundColor: '#007A4D' },
    '&:disabled': { backgroundColor: '#ccc', color: '#888' },
  },
  cancelBtn: { fontSize: 12, color: '#555', border: '1px solid #ccc' },

  // Misc
  backBtn: {
    fontSize: 13,
    color: '#00965E',
    marginBottom: theme.spacing(2),
    padding: 0,
    '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
  },
  noResults: { textAlign: 'center', color: '#999', fontSize: 14, padding: theme.spacing(4) },
}));

// ── Blank rule helper ─────────────────────────────────────────────────────────
const blankRule = (): Omit<SecurityGroupRule, 'id'> => ({
  direction: 'Inbound',
  protocol: 'TCP',
  portRange: '',
  source: '',
  description: '',
});

// ── Component ─────────────────────────────────────────────────────────────────
export function InfraSecurityGroupPage() {
  const classes = useStyles();

  // Step 1 state
  const [view, setView] = useState<'form' | 'groups'>('form');
  const [appId, setAppId] = useState('');
  const [appName, setAppName] = useState('');
  const [account, setAccount] = useState('');
  const [accountError, setAccountError] = useState('');
  const [region, setRegion] = useState('');
  const [ritm, setRitm] = useState('None');

  // Security groups state
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState<SecurityGroup[]>(SECURITY_GROUPS);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [addRuleFor, setAddRuleFor] = useState<string | null>(null);
  const [newRule, setNewRule] = useState(blankRule());

  // Filter
  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase();
    return q ? groups.filter(g => g.name.toLowerCase().includes(q)) : groups;
  }, [groups, search]);

  // Handlers
  const handleContinue = () => {
    if (!account) {
      setAccountError('Validation Message');
      return;
    }
    setAccountError('');
    const filtered = SECURITY_GROUPS.filter(g =>
      g.name.toLowerCase().includes(account.toLowerCase().split('-').slice(0, 2).join('-')),
    );
    setGroups(filtered.length ? filtered : SECURITY_GROUPS);
    setView('groups');
  };

  const toggleGroup = (id: string) =>
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const expandAll = () => setExpandedIds(new Set(filteredGroups.map(g => g.id)));
  const collapseAll = () => setExpandedIds(new Set());

  const openAddRule = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddRuleFor(groupId);
    setNewRule(blankRule());
    setExpandedIds(prev => new Set([...prev, groupId]));
  };

  const saveRule = (groupId: string) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId
          ? { ...g, rules: [...g.rules, { ...newRule, id: `r-${Date.now()}` }] }
          : g,
      ),
    );
    setAddRuleFor(null);
  };

  const deleteRule = (groupId: string, ruleId: string) =>
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId ? { ...g, rules: g.rules.filter(r => r.id !== ruleId) } : g,
      ),
    );

  const generateCsv = (updatesOnly: boolean) => {
    const rows: string[][] = [
      ['Security Group', 'Direction', 'Protocol', 'Port Range', 'Source', 'Description'],
    ];
    (updatesOnly ? groups.filter(g => g.hasUpdates) : groups).forEach(g =>
      g.rules.forEach(r =>
        rows.push([g.name, r.direction, r.protocol, r.portRange, r.source, r.description]),
      ),
    );
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = updatesOnly ? 'security-groups-updates.csv' : 'security-groups-all.csv';
    a.click();
  };

  // ── Page 1 ────────────────────────────────────────────────────────────
  if (view === 'form') {
    return (
      <div>
        <Typography className={classes.pageTitle}>
          Infrastructure Security Group Step 1
        </Typography>
        <Typography className={classes.pageSubtitle}>
          Infrastructure Security Group Step 1 form
        </Typography>

        <div className={classes.formHeader}>
          <Button
            className={classes.contactBtn}
            startIcon={<Icon style={{ fontSize: 14 }}>help_outline</Icon>}
          >
            QUESTIONS? CONTACT US!
          </Button>
        </div>

        {/* Application ID */}
        <div className={classes.formField}>
          <TextField
            label="What is your application ID?"
            value={appId}
            onChange={e => setAppId(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="e.g. SYSID-06534"
          />
        </div>

        {/* Application Name */}
        <div className={classes.formField}>
          <TextField
            label="What is your Application Name?"
            value={appName}
            onChange={e => setAppName(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="e.g. OpenShift (PaaS) - AWS"
          />
        </div>

        {/* Account */}
        <div className={classes.formField}>
          <FormControl variant="outlined" fullWidth error={!!accountError}>
            <InputLabel>Please select an account</InputLabel>
            <Select
              value={account}
              label="Please select an account"
              onChange={e => {
                setAccount(e.target.value as string);
                setAccountError('');
              }}
              endAdornment={
                account ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setAccount('')}>
                      <Icon style={{ fontSize: 16 }}>close</Icon>
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
            >
              {ACCOUNTS.map(a => (
                <MenuItem key={a} value={a}>{a}</MenuItem>
              ))}
            </Select>
            {accountError && (
              <FormHelperText className={classes.validationText}>
                {accountError}
              </FormHelperText>
            )}
          </FormControl>
        </div>

        {/* Region */}
        <div className={classes.formField}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select a region</InputLabel>
            <Select
              value={region}
              label="Select a region"
              onChange={e => setRegion(e.target.value as string)}
              endAdornment={
                region ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setRegion('')}>
                      <Icon style={{ fontSize: 16 }}>close</Icon>
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
            >
              {REGIONS.map(r => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* RITM */}
        <div className={classes.formField}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Only for updating an existing RITM? (optional)</InputLabel>
            <Select
              value={ritm}
              label="Only for updating an existing RITM? (optional)"
              onChange={e => setRitm(e.target.value as string)}
            >
              {['None', 'RITM0010001', 'RITM0010002', 'RITM0010003'].map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button className={classes.continueBtn} onClick={handleContinue}>
          CONTINUE
        </Button>
      </div>
    );
  }

  // ── Page 2 ────────────────────────────────────────────────────────────
  return (
    <div>
      <Button
        className={classes.backBtn}
        startIcon={<Icon style={{ fontSize: 16 }}>arrow_back</Icon>}
        disableRipple
        onClick={() => setView('form')}
      >
        Back to Step 1
      </Button>

      <Typography className={classes.pageTitle}>Security Groups</Typography>

      {/* Context chips */}
      <div className={classes.contextChips}>
        {account && <Chip label={`Account: ${account}`} className={classes.contextChip} size="small" />}
        {region && <Chip label={`Region: ${region}`} className={classes.contextChip} size="small" />}
        {appId && <Chip label={`App ID: ${appId}`} className={classes.contextChip} size="small" />}
      </div>

      {/* Top row */}
      <div className={classes.topRow}>
        <TextField
          className={classes.searchBox}
          placeholder="Search Security Groups"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon style={{ fontSize: 18, color: '#999' }}>search</Icon>
              </InputAdornment>
            ),
          }}
        />

        <div className={classes.actionsColumn}>
          <div className={classes.actionGroup}>
            <Typography className={classes.actionGroupLabel}>Create RITM Ticket</Typography>
            <Button className={classes.submitBtn}>SUBMIT TO SERVICENOW</Button>
          </div>
          <div className={classes.actionGroup}>
            <Typography className={classes.actionGroupLabel}>Generate CSV</Typography>
            <div className={classes.csvGroup}>
              <Button className={classes.csvAll} onClick={() => generateCsv(false)}>ALL</Button>
              <Button className={classes.csvUpdates} onClick={() => generateCsv(true)}>UPDATES ONLY</Button>
            </div>
          </div>
          <Tooltip title="Open Security Group Update documentation">
            <span className={classes.docsLink} onClick={() => window.open('#', '_blank')}>
              <Icon style={{ fontSize: 16, color: '#1976d2' }}>info</Icon>
              Security Group Update Docs
            </span>
          </Tooltip>
        </div>
      </div>

      <Divider style={{ marginBottom: 16 }} />

      {/* Expand / collapse all */}
      <div className={classes.controlsRow}>
        <Button className={classes.controlBtn} onClick={expandAll}>+ EXPAND ALL</Button>
        <Button className={classes.controlBtn} onClick={collapseAll}>− COLLAPSE ALL</Button>
      </div>

      {/* Groups list */}
      {filteredGroups.length === 0 ? (
        <Typography className={classes.noResults}>
          No security groups found matching "{search}"
        </Typography>
      ) : (
        filteredGroups.map(group => {
          const isOpen = expandedIds.has(group.id);
          const isAdding = addRuleFor === group.id;
          return (
            <Paper key={group.id} className={classes.sgCard} elevation={0}>
              {/* Header */}
              <div className={classes.sgHeader} onClick={() => toggleGroup(group.id)}>
                <div className={classes.sgHeaderLeft}>
                  <Typography className={classes.sgName}>{group.name}</Typography>
                  <Typography className={classes.sgMeta}>Managed by {group.managedBy}</Typography>
                </div>
                <div className={classes.sgHeaderRight}>
                  <Button
                    className={classes.addRuleBtn}
                    startIcon={<Icon style={{ fontSize: 14 }}>add</Icon>}
                    onClick={e => openAddRule(group.id, e)}
                  >
                    ADD NEW RULE
                  </Button>
                  <Icon className={`${classes.chevron} ${isOpen ? classes.chevronOpen : ''}`}>
                    expand_more
                  </Icon>
                </div>
              </div>

              {/* Expanded content */}
              <Collapse in={isOpen} timeout="auto">
                <div className={classes.rulesWrap}>
                  <Typography className={classes.rulesLabel}>
                    Rules ({group.rules.length})
                  </Typography>

                  {group.rules.length === 0 ? (
                    <Typography className={classes.noRules}>
                      No rules defined. Click "+ ADD NEW RULE" to add one.
                    </Typography>
                  ) : (
                    <Table size="small">
                      <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          {['Direction', 'Protocol', 'Port Range', 'Source / Destination', 'Description', ''].map(h => (
                            <TableCell key={h} className={classes.thCell}>{h}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.rules.map(rule => (
                          <TableRow key={rule.id} hover>
                            <TableCell className={classes.tdCell}>
                              <Chip
                                label={rule.direction}
                                size="small"
                                className={`${classes.dirChip} ${rule.direction === 'Inbound' ? classes.inbound : classes.outbound}`}
                              />
                            </TableCell>
                            <TableCell className={classes.tdCell}>{rule.protocol}</TableCell>
                            <TableCell className={classes.tdCell}>{rule.portRange}</TableCell>
                            <TableCell className={classes.tdCell}>{rule.source}</TableCell>
                            <TableCell className={classes.tdCell}>{rule.description}</TableCell>
                            <TableCell className={classes.tdCell} align="right">
                              <Tooltip title="Delete rule">
                                <IconButton
                                  size="small"
                                  style={{ color: '#c62828' }}
                                  onClick={() => deleteRule(group.id, rule.id)}
                                >
                                  <Icon style={{ fontSize: 16 }}>delete</Icon>
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {/* Inline add rule form */}
                  {isAdding && (
                    <div className={classes.addRuleForm}>
                      <Typography className={classes.addRuleTitle}>Add New Rule</Typography>

                      <div className={classes.formRow}>
                        <FormControl variant="outlined" size="small" className={classes.formRowField}>
                          <InputLabel>Direction</InputLabel>
                          <Select
                            value={newRule.direction}
                            label="Direction"
                            onChange={e => setNewRule(r => ({ ...r, direction: e.target.value as 'Inbound' | 'Outbound' }))}
                          >
                            <MenuItem value="Inbound">Inbound</MenuItem>
                            <MenuItem value="Outbound">Outbound</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl variant="outlined" size="small" className={classes.formRowField}>
                          <InputLabel>Protocol</InputLabel>
                          <Select
                            value={newRule.protocol}
                            label="Protocol"
                            onChange={e => setNewRule(r => ({ ...r, protocol: e.target.value as string }))}
                          >
                            {['TCP', 'UDP', 'ICMP', 'All'].map(p => (
                              <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          label="Port Range"
                          value={newRule.portRange}
                          onChange={e => setNewRule(r => ({ ...r, portRange: e.target.value }))}
                          variant="outlined"
                          size="small"
                          className={classes.formRowField}
                          placeholder="e.g. 443 or 8080-8090"
                        />
                      </div>

                      <div className={classes.formRow}>
                        <TextField
                          label="Source / Destination"
                          value={newRule.source}
                          onChange={e => setNewRule(r => ({ ...r, source: e.target.value }))}
                          variant="outlined"
                          size="small"
                          className={classes.formRowField}
                          placeholder="e.g. 10.0.0.0/8 or sg-abc123"
                        />
                        <TextField
                          label="Description"
                          value={newRule.description}
                          onChange={e => setNewRule(r => ({ ...r, description: e.target.value }))}
                          variant="outlined"
                          size="small"
                          className={classes.formRowField}
                          placeholder="e.g. Allow HTTPS from VPC"
                        />
                      </div>

                      <div className={classes.formActions}>
                        <Button className={classes.cancelBtn} onClick={() => setAddRuleFor(null)}>
                          Cancel
                        </Button>
                        <Button
                          className={classes.saveBtn}
                          onClick={() => saveRule(group.id)}
                          disabled={!newRule.portRange || !newRule.source}
                        >
                          Save Rule
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Collapse>
            </Paper>
          );
        })
      )}
    </div>
  );
}

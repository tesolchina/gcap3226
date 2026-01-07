import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Search, FileCheck, FolderOpen, ExternalLink, BookOpen, CheckCircle2, AlertCircle, Globe } from "lucide-react";

const Spring2026CuratingPublicData = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/spring-2026" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Course Home
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500 rounded-full">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Self-Access Learning Module</p>
              <h1 className="text-3xl font-bold text-primary">Curating Publicly Available Data</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Learn how to find, evaluate, organize, and cite publicly available data sources for policy research in Hong Kong.
          </p>
        </div>

        {/* Introduction */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Why Data Curation Matters
          </h2>
          <p className="text-muted-foreground mb-4">
            Publicly available data is a rich resource for policy analysis. However, finding reliable data and organizing it 
            effectively requires systematic skills. Good data curation ensures your research is reproducible, credible, and efficient.
          </p>
          <div className="bg-cyan-50 dark:bg-cyan-950/30 rounded-lg p-4">
            <p className="text-sm">
              <strong>Definition:</strong> Data curation involves the collection, organization, validation, and documentation 
              of datasets to make them accessible and useful for analysis.
            </p>
          </div>
        </Card>

        {/* Step 1: Finding Data */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            Step 1: Finding Government Data Portals
          </h2>
          <p className="text-muted-foreground mb-4">
            Hong Kong government publishes extensive data through various portals:
          </p>
          
          <div className="space-y-4">
            {/* DATA.GOV.HK */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Globe className="h-6 w-6 text-green-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">DATA.GOV.HK</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Hong Kong's official open data portal with over 5,000 datasets across all policy areas.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">Transport</span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">Health</span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">Environment</span>
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded">Economy</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://data.gov.hk/en/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit DATA.GOV.HK
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Census and Statistics */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Globe className="h-6 w-6 text-blue-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Census and Statistics Department</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Comprehensive demographic, economic, and social statistics with historical time series.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.censtatd.gov.hk/en/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit Census & Statistics
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* LegCo */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Globe className="h-6 w-6 text-amber-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Legislative Council Papers</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Policy papers, statistics, and research summaries submitted to lawmakers.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.legco.gov.hk/en/index.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit LegCo Website
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Topic-Specific Portals:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Health:</strong> Centre for Health Protection, Hospital Authority</li>
              <li>• <strong>Transport:</strong> Transport Department, TD Data Portal</li>
              <li>• <strong>Environment:</strong> Environmental Protection Department</li>
              <li>• <strong>Finance:</strong> MPFA, Companies Registry</li>
            </ul>
          </div>
        </Card>

        {/* Step 2: Evaluating Data Quality */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-green-500" />
            Step 2: Evaluating Data Quality
          </h2>
          <p className="text-muted-foreground mb-4">
            Not all publicly available data is equally reliable. Use these criteria to evaluate sources:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-medium text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                High Quality Indicators
              </h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>✓ Published by official government sources</li>
                <li>✓ Clear methodology documentation</li>
                <li>✓ Regular update schedule</li>
                <li>✓ Consistent data format</li>
                <li>✓ Machine-readable (CSV, JSON, API)</li>
                <li>✓ Metadata included</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Quality Concerns
              </h3>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                <li>✗ Outdated information (check dates)</li>
                <li>✗ Missing values without explanation</li>
                <li>✗ Inconsistent definitions over time</li>
                <li>✗ PDF-only format (harder to analyze)</li>
                <li>✗ No clear source attribution</li>
                <li>✗ Aggregation masks important details</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium mb-2">💡 Data Quality Checklist:</h3>
            <div className="grid md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Source verified?</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Date range clear?</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Units defined?</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Methodology documented?</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Complete coverage?</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded" readOnly />
                <span>Format usable?</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 3: Organizing Data */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-purple-500" />
            Step 3: Organizing and Documenting Data Sources
          </h2>
          <p className="text-muted-foreground mb-4">
            Keep a systematic record of all data sources you collect:
          </p>

          <div className="bg-muted rounded-lg p-4 mb-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Dataset Name</th>
                  <th className="text-left py-2 px-2">Source</th>
                  <th className="text-left py-2 px-2">Date Range</th>
                  <th className="text-left py-2 px-2">Format</th>
                  <th className="text-left py-2 px-2">Access Date</th>
                  <th className="text-left py-2 px-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-2">Vaccination Statistics</td>
                  <td className="py-2 px-2">CHP</td>
                  <td className="py-2 px-2">2020-2024</td>
                  <td className="py-2 px-2">CSV</td>
                  <td className="py-2 px-2">15 Feb 2026</td>
                  <td className="py-2 px-2">Weekly updates</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-2">Population by District</td>
                  <td className="py-2 px-2">Census Dept</td>
                  <td className="py-2 px-2">2021</td>
                  <td className="py-2 px-2">Excel</td>
                  <td className="py-2 px-2">15 Feb 2026</td>
                  <td className="py-2 px-2">Census year only</td>
                </tr>
                <tr>
                  <td className="py-2 px-2 text-muted-foreground italic" colSpan={6}>Add your datasets here...</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Best Practices for Data Organization:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Consistent naming:</strong> Use clear, descriptive file names (e.g., "vaccination_rates_2020-2024_CHP.csv")</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Version control:</strong> Keep original files unmodified; create copies for analysis</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>Folder structure:</strong> Organize by source, topic, or analysis stage</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span><strong>README file:</strong> Include a summary document explaining all datasets</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Step 4: Citation */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📝 Step 4: Data Citation Best Practices</h2>
          <p className="text-muted-foreground mb-4">
            Proper citation ensures reproducibility and academic integrity:
          </p>

          <div className="bg-muted rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-2">Standard Data Citation Format:</h3>
            <p className="font-mono text-sm">
              [Department/Organization]. ([Year]). <em>[Dataset Title]</em>. [Publisher]. Retrieved [Date] from [URL]
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <h3 className="font-medium">Examples:</h3>
            <div className="bg-muted/50 rounded p-3">
              <p className="text-sm font-mono">
                Centre for Health Protection. (2024). <em>Seasonal Influenza Vaccination Statistics</em>. 
                Department of Health. Retrieved February 15, 2026, from https://www.chp.gov.hk/
              </p>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <p className="text-sm font-mono">
                Transport Department. (2024). <em>Road Traffic Accident Statistics</em> [Data set]. 
                DATA.GOV.HK. Retrieved February 15, 2026, from https://data.gov.hk/
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
            <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">⚠️ Important Notes:</h3>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Always include the access date - data may be updated</li>
              <li>• Save or archive datasets at the time of access</li>
              <li>• Note any data transformations you perform</li>
              <li>• Include version numbers if available</li>
            </ul>
          </div>
        </Card>

        {/* AI-Assisted Curation Discussion */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <h2 className="text-xl font-semibold mb-4">🤖 AI-Assisted Data Curation Discussions</h2>
          <p className="text-muted-foreground mb-4">
            Your project group discussion board includes an AI assistant that can help with data curation. 
            Try asking questions like:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <p className="text-sm italic">"What public data sources exist for flu vaccination rates in Hong Kong?"</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <p className="text-sm italic">"How can I verify if this dataset is reliable for policy analysis?"</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <p className="text-sm italic">"What's the best way to merge data from different government departments?"</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
              <p className="text-sm italic">"How should I document missing data in my dataset?"</p>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild>
              <Link to="/spring-2026/topics">Go to Your Project Discussion</Link>
            </Button>
          </div>
        </Card>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="ghost" asChild>
            <Link to="/spring-2026/resources/government-info-requests" className="flex items-center gap-2">
              ← Previous: Government Info Requests
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/spring-2026/topics">Go to Your Project Group</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Spring2026CuratingPublicData;
